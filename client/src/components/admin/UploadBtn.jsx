import {
  Box,
  Button,
  FileUpload,
  CloseButton,
  Dialog,
  Portal,
  Icon,
  NativeSelect,
  Field,
} from "@chakra-ui/react";
import { toaster } from "@/components/chakra-ui/toaster";

import { LuUpload } from "react-icons/lu";
import { useState } from "react";
import { databaseMap } from "@/utils/maps";
import useAdmin from "../../../hooks/useAdmin";

const UploadBtn = () => {
  const [formData, setFormData] = useState({
    file: null,
    database: "",
    headers: [],
  });

  const { uploadToServer } = useAdmin();

  const handleFileChange = (e) => {
    const inputFile = e.target.files?.[0];

    if (!inputFile) return setFormData((prev) => ({ ...prev, file: null }));

    setFormData((prev) => ({ ...prev, file: inputFile }));
  };

  const handleSelectChange = (e) => {
    const entryMatch = Object.values(databaseMap).find(
      (db) => db.name === e.target.value
    );

    // Intended table name and associated table headers are matched
    // and sent to the server for validation
    setFormData((prev) => ({
      ...prev,
      database: e.target.value,
      headers: entryMatch.headers,
    }));
  };

  const handleUpload = async () => {
    const form = new FormData();
    form.append("file", formData.file);
    form.append("headers", JSON.stringify(formData.headers));

    const result = await uploadToServer(form, formData.database);

    if (!result) return;
    toaster.create({
      description: result,
      type: "success",
    });
  };

  return (
    <Dialog.Root placement="center">
      <Dialog.Trigger asChild>
        <Button
          variant="solid"
          colorPalette={"orange"}
          color={"white"}
          size="sm">
          Upload CSV
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Upload CSV</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              {/* TARGET DB SELECT */}
              <Field.Root className="mt-4">
                <Field.Label>Select Target Database</Field.Label>
                <NativeSelect.Root>
                  <NativeSelect.Field
                    name="database"
                    value={formData.database}
                    onChange={handleSelectChange}>
                    <option value="" disabled>
                      Choose Option
                    </option>
                    {Object.entries(databaseMap).map(([key, db]) => (
                      <option key={key} value={db.name}>
                        {key}
                      </option>
                    ))}
                  </NativeSelect.Field>
                  <NativeSelect.Indicator />
                </NativeSelect.Root>
                {Object.entries(databaseMap).map(([key, db]) =>
                  formData.database === db.name ? (
                    <h5 color="red" key={key}>
                      * Uploaded file must have the following column headers:
                      <br></br>
                      {db.headers.join(" | ")}
                    </h5>
                  ) : null
                )}
              </Field.Root>
              {/* FILE UPLOAD */}
              <FileUpload.Root
                maxW="xl"
                alignItems="stretch"
                maxFiles={1}
                accept={["text/csv"]}
                onChange={handleFileChange}>
                <FileUpload.HiddenInput />

                <FileUpload.Dropzone mt={4}>
                  <Icon size="md" color="fg.muted">
                    <LuUpload />
                  </Icon>
                  <FileUpload.DropzoneContent>
                    <Box>Drag and drop files here</Box>
                    <Box color="fg.muted">.csv up to 5MB</Box>
                  </FileUpload.DropzoneContent>
                </FileUpload.Dropzone>
                <FileUpload.List clearable />
              </FileUpload.Root>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.ActionTrigger>
              <Button
                colorPalette={"green"}
                onClick={handleUpload}
                disabled={formData.file && formData?.database ? false : true}>
                Upload
              </Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default UploadBtn;
