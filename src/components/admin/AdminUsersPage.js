import React, { useContext, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { blockUser, getAllUsers } from "../../http/UserHttp";
import { Context } from "../../index";
import { Box, Button, Grid } from "@mui/material";
import { observer } from "mobx-react-lite";
import { UserStatuses } from "../../util/Consts";

const toolbar = (props) => {
  const { user, handleClickFn } = props;

  const getStatus = () => {
    return user.status === UserStatuses.ACTIVE ? "Block user" : "Active user";
  };

  const btns = [
    {
      id: 0,
      label: getStatus(),
    },
  ];

  return (
    <Grid container spacing={2} sx={{ p: 1 }}>
      {btns.map((btn) => (
        <Grid item xs={3} key={btn.id}>
          <Button variant="outlined" onClick={() => handleClickFn(btn.id)}>
            {btn.label}
          </Button>
        </Grid>
      ))}
    </Grid>
  );
};

const AdminUsersPage = observer(() => {
  const { user } = useContext(Context);
  const [selectedRow, setSelectedRow] = useState({});
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

  const rowClick = ({ row }) => {
    if (selectedRow?.id === row.id) {
      setSelectedRow({});
      return;
    }
    setSelectedRow(row);
  };

  const toolbarClickHandle = (val) => {
    console.log(val);
    switch (val) {
      case 0:
        blockUser(selectedRow)
          .then((res) => {
            console.log(res);
            user.setAllUsers(localUpdateTable(res));
          })
          .catch((error) => {
            console.log(error);
          });
        break;
    }
  };

  const localUpdateTable = (res) => {
    setSelectedRow({});
    return user.allUsers.map((elem) => (elem.id === res.id ? res : elem));
  };

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
        onRowClick={rowClick}
        rowSelectionModel={
          Object.keys(selectedRow).length !== 0 ? selectedRow.id : 0
        }
        slots={{
          toolbar: Object.keys(selectedRow).length !== 0 ? toolbar : null,
        }}
        slotProps={{
          toolbar: {
            handleClickFn: toolbarClickHandle,
            user: selectedRow,
          },
        }}
        autoHeight
      />
    </Box>
  );
});

export default AdminUsersPage;
