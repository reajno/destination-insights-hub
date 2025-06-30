import { useState, useEffect } from "react";
import useMicrotaskEffect from "../../hooks/useMicrotaskEffect";
import useAuth from "../../hooks/useAuth";
import useAdmin from "../../hooks/useAdmin";
import { Box, Flex, Table, useBreakpointValue } from "@chakra-ui/react";
import { toaster } from "@/components/chakra-ui/toaster";
import RemoveUserBtn from "@/components/admin/RemoveUserBtn";
import AddUserBtn from "@/components/admin/AddUserBtn";
import UploadBtn from "@/components/admin/UploadBtn";
import NavSpacer from "@/components/nav/NavSpacer";
import SidebarDesktop from "@/components/sidebar/SidebarDesktop";
import SidebarMobileDrawer from "@/components/sidebar/SidebarMobileDrawer";
import { useLocation } from "react-router-dom";
import MainContainer from "@/components/MainContainer";

const Admin = () => {
  const [tableData, setTableData] = useState([]);
  const { user, isAuthLoading } = useAuth();
  const { fetchUsers, adminError } = useAdmin();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const { pathname } = useLocation();

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

  return (
    <>
      <NavSpacer />

      <MainContainer>
        {/* DESKTOP SIDEBAR*/}
        {!isMobile && (
          <SidebarDesktop isMobile={isMobile} pathname={pathname} />
        )}

        {/* MOBILE SIDEBAR DRAWER*/}
        {isMobile && (
          <SidebarMobileDrawer isMobile={isMobile} pathname={pathname} />
        )}

        {!isAuthLoading && (
          <Box p={4} w={"100%"}>
            <Table.Root
              size="sm"
              interactive
              color={"black"}
              colorPalette={"gray"}
              showColumnBorder>
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeader bg={"gray.50"} color={"black"}>
                    Name
                  </Table.ColumnHeader>
                  <Table.ColumnHeader bg={"gray.50"} color={"black"}>
                    Local Government Area
                  </Table.ColumnHeader>
                  <Table.ColumnHeader bg={"gray.50"} color={"black"}>
                    Company
                  </Table.ColumnHeader>
                  <Table.ColumnHeader bg={"gray.50"} color={"black"}>
                    Role
                  </Table.ColumnHeader>
                  <Table.ColumnHeader
                    bg={"gray.50"}
                    color={"black"}></Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {tableData?.map((row) => (
                  <Table.Row key={row.id}>
                    <Table.Cell bg={"gray.50"}>
                      {row.first_name + " " + row.last_name}
                    </Table.Cell>
                    <Table.Cell bg={"gray.50"}>{row.lga_name}</Table.Cell>
                    <Table.Cell bg={"gray.50"}>{row.company}</Table.Cell>
                    <Table.Cell bg={"gray.50"}>{row.role}</Table.Cell>
                    <Table.Cell bg={"gray.50"}>
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
          </Box>
        )}
      </MainContainer>
    </>
  );
  // isAuthLoading ? (
  //   <h1>Loading...</h1>
  // ) : (
  //   <div>
  //     Hello from Admin {user.first_name}

  //   </div>
  // );
};
export default Admin;
