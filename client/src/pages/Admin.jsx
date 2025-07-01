import { useState, useEffect } from "react";
import useMicrotaskEffect from "../../hooks/useMicrotaskEffect";
import useAuth from "../../hooks/useAuth";
import useAdmin from "../../hooks/useAdmin";
import { Box, Table, Flex } from "@chakra-ui/react";
import { toaster } from "@/components/chakra-ui/toaster";
import RemoveUserBtn from "@/components/admin/RemoveUserBtn";
import AddUserBtn from "@/components/admin/AddUserBtn";
import UploadBtn from "@/components/admin/UploadBtn";

const Admin = () => {
  const [tableData, setTableData] = useState([]);
  const { user } = useAuth();
  const { fetchUsers, adminError } = useAdmin();

  useMicrotaskEffect(() => {
    if (adminError) {
      toaster.create({
        description: adminError.message,
        type: "error",
      });
    }
  }, [adminError]);

  useEffect(() => {
    const fetchTableData = async () => {
      const allUsers = await fetchUsers();
      setTableData(allUsers);
    };

    fetchTableData();
  }, []);

  return (
    <Flex flexDirection={"column"} gap={4}>
      <Box p={4} w="100%">
        <Table.Root size="sm" interactive color="black" showColumnBorder>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader
                bg="gray.50"
                color={"black"}
                fontWeight="bold">
                Name
              </Table.ColumnHeader>
              <Table.ColumnHeader
                bg="gray.50"
                color={"black"}
                fontWeight="bold">
                Local Government Area
              </Table.ColumnHeader>
              <Table.ColumnHeader
                bg="gray.50"
                color={"black"}
                fontWeight="bold">
                Company
              </Table.ColumnHeader>
              <Table.ColumnHeader
                bg="gray.50"
                color={"black"}
                fontWeight="bold">
                Role
              </Table.ColumnHeader>
              <Table.ColumnHeader bg="gray.50"></Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {tableData?.map((row) => (
              <Table.Row key={row.id}>
                <Table.Cell bg="gray.50">
                  {row.first_name + " " + row.last_name}
                </Table.Cell>
                <Table.Cell bg="gray.50">{row.lga_name}</Table.Cell>
                <Table.Cell bg="gray.50">{row.company}</Table.Cell>
                <Table.Cell bg="gray.50">{row.role}</Table.Cell>
                <Table.Cell bg="gray.50">
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
      </Box>
      <Flex justifyContent="center" gap={4}>
        <AddUserBtn
          onUserAdded={(newUser) => {
            setTableData((prev) => [newUser, ...prev]);
          }}
        />
        <UploadBtn />
      </Flex>
    </Flex>
  );
};

export default Admin;
