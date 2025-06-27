import { useState } from "react";
import { toaster } from "@/components/chakra-ui/toaster";
import useAdmin from "../../../hooks/useAdmin";
import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";

const RemoveUserBtn = ({ onUserRemoved, user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { deleteUser } = useAdmin();

  const userFullName = user.first_name + " " + user.last_name;

  const handleDelete = async (e) => {
    e.preventDefault();
    const deleted = await deleteUser(user.id);

    if (deleted) {
      onUserRemoved(user.id); // Pass deleted user ID up to parent

      toaster.create({
        description: `${userFullName} has been removed from the database`,
        type: "success",
      });
    }
  };

  return (
    <Dialog.Root placement="center">
      <Dialog.Trigger asChild>
        <Button variant="outline" size="sm">
          ❌
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Are you sure?</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <p>
                You are about to delete {userFullName + " "}
                from the database.
                <br></br>
                <br></br>
                This procedure is irreversible.
              </p>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.ActionTrigger>
              <Button colorPalette={"red"} onClick={handleDelete}>
                Delete User
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
export default RemoveUserBtn;
