import React, { useContext, useEffect, useState } from "react";
import { Box, CircularProgress, Container, Grid, Paper } from "@mui/material";
import UserPageMenu from "../components/UserPageMenu";
import UserProfile from "../components/UserProfile";
import UserSubscription from "../components/UserSubscription";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { getUser, getUserSubs } from "../http/UserHttp";

const UserPage = observer(() => {
  const { user, userSubs } = useContext(Context);

  const [menuValue, setMenuValue] = useState("Profile");
  const [loading, setLoading] = useState(true);

  const menuClickHandle = (value) => {
    setMenuValue(value);
  };

  useEffect(() => {
    const getCurrentUser = () => {
      getUser()
        .then((res) => {
          user.setUser(res);
        })
        .catch((error) => {
          user.setIsAuth(false);
          console.log(error);
        })
        .finally(() => setLoading(false));
    };

    const getCurrnetSubs = () => {
      getUserSubs()
        .then((res) => {
          userSubs.setUserSubs(res);
          console.log("response subs", res);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    getCurrentUser();
    getCurrnetSubs();
  }, []);

  const getComponent = () => {
    switch (menuValue) {
      case "Profile":
        return <UserProfile user={user} />;
      case "Subscription":
        return <UserSubscription subs={userSubs.userSubs} />;
      default:
        return <UserProfile />;
    }
  };

  if (loading)
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
          <UserPageMenu
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

export default UserPage;
