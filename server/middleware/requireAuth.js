import { supabase } from "../supabaseClient.js";

const requireAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  // Extract token
  const token = authHeader.replace("Bearer ", "");

  // validate token
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser(token);

  if (error || !user) {
    return res
      .status(401)
      .json({ error: "Invalid or expired session, please log in" });
  }

  next();
};

export default requireAuth;
