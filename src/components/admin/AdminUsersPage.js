import React, { useContext, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { getAllUsers } from "../../http/UserHttp";
import { Context } from "../../index";
import { Box } from "@mui/material";
import { observer } from "mobx-react-lite";

const AdminUsersPage = observer(() => {
  const { user } = useContext(Context);
  const columns = [
    { field: "id", headerName: "ID", type: "number", flex: 0 },
    {
      field: "login",
      headerName: "Login",
      type: "String",
      flex: 0,
    },
    {
      field: "hwid",
      headerName: "Hwid",
      type: "String",
      flex: 0,
    },
    {
      field: "status",
      headerName: "Status",
      type: "String",
      flex: 0,
    },
    {
      field: "role",
      headerName: "Role",
      type: "String",
      flex: 0,
    },
    {
      field: "dateOfRegistration",
      headerName: "DateOfRegistration",
      type: "number",
      flex: 1,
    },
  ];

  useEffect(() => {
    getAllUsers().then((res) => {
      user.setAllUsers(res);
      console.log(res);
    });
  }, [user]);

  return (
    <Box>
      <DataGrid
        columns={columns}
        rows={user.allUsers}
        pageSize={5}
        rowsPerPageOptions={[5]}
        autoHeight
      />
    </Box>
  );
});

export default AdminUsersPage;
