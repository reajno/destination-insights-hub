import { useState, useEffect } from "react";
import useMicrotaskEffect from "../../hooks/useMicrotaskEffect";
import useAuth from "../../hooks/useAuth";
import useAdmin from "../../hooks/useAdmin";
import { Table } from "@chakra-ui/react";
import { toaster } from "@/components/chakra-ui/toaster";
import RemoveUserBtn from "@/components/admin/RemoveUserBtn";
import AddUserBtn from "@/components/admin/AddUserBtn";
import UploadBtn from "@/components/admin/UploadBtn";

const Admin = () => {
  const [tableData, setTableData] = useState([]);
  const { user, isAuthLoading } = useAuth();
  const { fetchUsers, adminError } = useAdmin();

  // Render toasts
  useMicrotaskEffect(() => {
    if (adminError) {
      toaster.create({
        description: adminError.message,
        type: "error",
      });
    }
  }, [adminError]);

  // Fetch user list as table data
  useEffect(() => {
    const fetchTableData = async () => {
      const allUsers = await fetchUsers();
      setTableData(allUsers);
    };

    fetchTableData();
  }, []);

  return isAuthLoading ? (
    <h1>Loading...</h1>
  ) : (
    <div>
      Hello from Admin {user.first_name}
      <Table.Root size="sm" interactive>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Name</Table.ColumnHeader>
            <Table.ColumnHeader>Local Government Area</Table.ColumnHeader>
            <Table.ColumnHeader>Company</Table.ColumnHeader>
            <Table.ColumnHeader>Role</Table.ColumnHeader>
            <Table.ColumnHeader></Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {tableData?.map((row) => (
            <Table.Row key={row.id}>
              <Table.Cell>{row.first_name + " " + row.last_name}</Table.Cell>
              <Table.Cell>{row.lga_name}</Table.Cell>
              <Table.Cell>{row.company}</Table.Cell>
              <Table.Cell>{row.role}</Table.Cell>
              <Table.Cell>
                {user.id === row.id ? null : (
                  <RemoveUserBtn
                    onUserRemoved={(removedID) => {
                      setTableData((prev) =>
                        prev.filter((user) => user.id !== removedID)
                      );
                    }}
                    user={row}
                  />
                )}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <div className="flex justify-center">
        <AddUserBtn
          onUserAdded={(newUser) => {
            setTableData((prev) => [newUser, ...prev]);
          }}
        />
        <UploadBtn />
      </div>
    </div>
  );
};
export default Admin;
