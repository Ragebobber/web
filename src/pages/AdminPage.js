import React, { useContext, useEffect, useState } from "react";
import { Box, CircularProgress, Container, Grid, Paper } from "@mui/material";
import AdminMenu from "../components/admin/AdminMenu";
import { Context } from "../index";
import { getUser } from "../http/UserHttp";
import AdminUsersPage from "../components/admin/AdminUsersPage";
import AdminProductPage from "../components/admin/AdminProductPage";
import { useNavigate } from "react-router-dom";
import { AUTH_ROUTE } from "../util/Consts";
import { observer } from "mobx-react-lite";

const AdminPage = observer(() => {
  const { user } = useContext(Context);

  const [loading, setLoading] = useState(true);
  const [menuValue, setMenuValue] = useState("Users");
  const navigate = useNavigate();

  const menuClickHandle = (value) => {
    setMenuValue(value);
  };

  const getComponent = () => {
    switch (menuValue) {
      case "Users":
        return <AdminUsersPage />;
      case "Products":
        return <AdminProductPage />;
      case "LogOut":
        localStorage.clear();
        navigate(AUTH_ROUTE);
        break;
      default:
        return <AdminUsersPage />;
    }
  };

  useEffect(() => {
    getUser()
      .then((res) => {
        user.setUser(res);
      })
      .catch((error) => {
        user.setIsAuth(false);
        console.log(error);
      })
      .finally(() => setLoading(false));
  }, [user]);

  if (loading || !user.isAdmin)
    return (
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress size={80} />
      </Box>
    );

  return (
    <Container sx={{ py: 1 }} disableGutters>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <AdminMenu
            menuClickHandle={menuClickHandle}
            currentItem={menuValue}
          />
        </Grid>
        <Grid item xs={8}>
          <Paper sx={{ height: "90vh", p: 1 }}>{getComponent()}</Paper>
        </Grid>
      </Grid>
    </Container>
  );
});

export default AdminPage;
