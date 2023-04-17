import "./App.css";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./routes/AppRouter";
import { useContext, useEffect, useState } from "react";
import { check } from "./http/UserHttp";
import { Context } from "./index";
import { observer } from "mobx-react-lite";
import { Roles } from "./util/Consts";
import { Box, CircularProgress } from "@mui/material";

const App = observer(() => {
  const { user } = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    check()
        .then((data) => {
          user.setIsAuth(true);
          user.setIsAdmin(data.role === Roles.ADMIN);
          // user.setUser(true);
          user.setUserRole(data.role);
        })
        .catch((error) => {
          console.log(error);
          user.setIsAuth(false);
        })
        .finally(() => setLoading(false));
  }, [user]);

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
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
  );
});

export default App;
