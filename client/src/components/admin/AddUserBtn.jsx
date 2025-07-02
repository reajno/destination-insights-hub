import { useState } from "react";
import useAdmin from "../../../hooks/useAdmin";
import {
  Button,
  CloseButton,
  Dialog,
  Portal,
  Box,
  Fieldset,
  NativeSelect,
} from "@chakra-ui/react";
import { toaster } from "@/components/chakra-ui/toaster";
import InputField from "@/components/chakra-ui/InputField";
import { lgaMap } from "@/utils/maps";

const AddUserBtn = ({ onUserAdded }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    lga_name: "",
    company: "",
    email: "",
    password: "",
    role: "",
  });

  const { signUpUser } = useAdmin();

  const handleSignUp = async (e) => {
    e.preventDefault();

    // Errors will be handled by parent
    const newUser = await signUpUser(formData);

    if (newUser) {
      // Pass new user up to parent
      onUserAdded(newUser);
      // Reset form data
      setFormData({
        first_name: "",
        last_name: "",
        lga_name: "",
        company: "",
        email: "",
        password: "",
        role: "",
      });
      // Show success message
      toaster.create({
        description: `${newUser.first_name} ${newUser.last_name} has been added as an ${newUser.role}`,
        type: "success",
      });

      setIsOpen(false);
    }
    return;
  };

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(e) => {
        setIsOpen(e.open);
      }}
      placement="center">
      <Dialog.Trigger asChild>
        <Button variant="solid" colorPalette={"green"} size="sm">
          Add User
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Create new user</Dialog.Title>
            </Dialog.Header>
            <Box as="form" onSubmit={handleSignUp}>
              <Dialog.Body>
                {/* USER FORM */}
                <Fieldset.Root size="md">
                  <Fieldset.Content>
                    <InputField
                      required={true}
                      label="First Name"
                      type="text"
                      name="first-name"
                      value={formData.first_name}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          first_name: e.target.value,
                        }))
                      }
                      placeholder="John"
                    />
                    <InputField
                      mt={4}
                      required={true}
                      label="Last Name"
                      type="text"
                      name="last-name"
                      value={formData.last_name}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          last_name: e.target.value,
                        }))
                      }
                      placeholder="Doe"
                    />
                    <InputField
                      mt={4}
                      required={true}
                      label="Local Government Area">
                      <NativeSelect.Root>
                        <NativeSelect.Field
                          value={formData.lga_name}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              lga_name: e.target.value,
                            }))
                          }>
                          <option value="" disabled>
                            Choose Option
                          </option>
                          {Object.keys(lgaMap).map((lga) => (
                            <option key={lga} value={lga}>
                              {lga}
                            </option>
                          ))}
                        </NativeSelect.Field>
                        <NativeSelect.Indicator />
                      </NativeSelect.Root>
                    </InputField>

                    <InputField
                      mt={4}
                      required={true}
                      label="Company"
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          company: e.target.value,
                        }))
                      }
                      placeholder="Gold Coast City Council"
                    />
                    <InputField
                      mt={4}
                      required={true}
                      label="Email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      placeholder="you@example.com"
                    />
                    <InputField
                      mt={4}
                      required={true}
                      label="Password"
                      type="password"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          password: e.target.value,
                        }))
                      }
                      placeholder="••••••••"
                    />
                    <InputField mt={4} required={true} label="Role">
                      <NativeSelect.Root>
                        <NativeSelect.Field
                          value={formData.role}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              role: e.target.value,
                            }))
                          }>
                          <option value="" disabled>
                            Choose Option
                          </option>
                          <option value="Operator">Operator</option>
                          <option value="Analyst">Analyst</option>
                          <option value="Admin">Admin</option>
                        </NativeSelect.Field>
                        <NativeSelect.Indicator />
                      </NativeSelect.Root>
                    </InputField>
                  </Fieldset.Content>
                </Fieldset.Root>
              </Dialog.Body>
              <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                  <Button variant="outline">Cancel</Button>
                </Dialog.ActionTrigger>
                <Button type="submit">Add</Button>
              </Dialog.Footer>
            </Box>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default AddUserBtn;
