import { Router } from "express";
import { supabase } from "../supabaseClient.js";
import multer from "multer";
import requireAuth from "../middleware/requireAuth.js";
import dateIsValid from "../utils/dateIsValid.js";
import parseCSV from "../utils/parseCSV.js";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/create-user", requireAuth, async (req, res) => {
  const { first_name, last_name, lga_name, company, email, password, role } =
    req.body;

  try {
    const { data: signUpData, error: signUpError } =
      await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
      });

    if (signUpError) throw signUpError;

    const id = signUpData.user.id;

    const { error: insertError } = await supabase.from("profiles").insert([
      {
        id,
        first_name,
        last_name,
        lga_name,
        company,
        role,
      },
    ]);

    if (insertError) {
      await supabase.auth.admin.deleteUser(id);
      throw insertError;
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", id)
      .single();

    res.status(201).json({ data: profile });
  } catch (error) {
    res.status(500).json({ error: { message: error.message } });
  }
});

router.delete("/delete-user/:id", requireAuth, async (req, res) => {
  const { id } = req.params;
  try {
    const { data: deletedUser, error } = await supabase
      .from("profiles")
      .delete()
      .eq("id", id)
      .select();

    if (error) throw error;

    const { error: deleteError } = await supabase.auth.admin.deleteUser(id);
    if (deleteError) throw deleteError;

    res.status(200).json({ deletedUser });
  } catch (error) {
    res.status(500).json({ error: { message: error.message } });
  }
});

router.post(
  "/upload/:dbName",
  requireAuth,
  upload.single("file"),
  async (req, res) => {
    const { dbName } = req.params;

    // Parse string into array
    const requiredHeaders = JSON.parse(req.body.headers);

    try {
      if (!req.file) throw new Error({ message: "No file uploaded" });

      // Create string buffer
      const csvData = req.file.buffer.toString("utf8");

      // Parse using Papa.parse
      const { data, meta } = await parseCSV(csvData);

      // Validate CSV column headers against request headers
      const csvHeaders = meta.fields;
      const missingHeaders = requiredHeaders.filter(
        (header) => !csvHeaders.includes(header)
      );

      if (missingHeaders.length > 0) {
        return res.status(400).json({
          error: {
            message: `Missing required columns: ${missingHeaders.join(" | ")}`,
          },
        });
      }

      // Validate date format "YYYY-MM-DD" - If invalid, identify row index and send to error message
      const invalidDateRows = data
        .map((row, i) => (!dateIsValid(row.date) ? i + 1 : null))
        .filter((i) => i !== null);

      if (invalidDateRows.length > 0) {
        return res.status(400).json({
          error: {
            message: `Date format must be YYYY-MM-DD. Update the following rows and try again: ${invalidDateRows.join(
              ", "
            )}`,
          },
        });
      }

      // Insert rows to database
      const { error: insertError } = await supabase.from(dbName).insert(data);

      if (insertError) {
        throw insertError;
      }

      return res.status(200).json({
        message: `CSV uploaded successfully, ${data.length} row(s) inserted`,
      });
    } catch (error) {
      res.status(500).json({
        error: {
          message: error.message || "Failed to upload CSV to database",
        },
      });
      console.log(error);
    }
  }
);

export default router;
