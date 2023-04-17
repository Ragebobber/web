import React, { useContext, useState } from "react";

import "../styles/AuthPage.css";
import {
  Alert,
  Button,
  Card,
  CardActions,
  CardContent,
  Snackbar,
  Stack,
  Tab,
  Tabs,
  TextField,
} from "@mui/material";
import { login, registration } from "../http/UserHttp";
import { ResponseStatuses, Roles, USER_ROUTE } from "../util/Consts";
import { useNavigate } from "react-router-dom";
import { Context } from "../index";
import { observer } from "mobx-react-lite";

const AuthPage = observer(() => {
  const { user } = useContext(Context);
  const navigate = useNavigate();

  const [value, setValue] = useState("1");
  const [btnLabel, setBtnLabel] = useState("Login");
  const [showGradient, setShowGradient] = useState(true);
  const [loginValue, setLoginValue] = useState("");
  const [passswordValue, setPassswordValue] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [alertType, setAlertType] = useState("success");

  const handleChange = (event, newValue) => {
    setBtnLabel(newValue === "2" ? "Registration" : "Login");
    setValue(newValue);
  };

  const playVideo = () => {
    if (!showGradient || !process.env.BGVIDEO_PATH) return;
    setShowGradient(false);
  };

  const authHandle = () => {
    switch (value) {
      case "1":
        login({ login: loginValue, password: passswordValue })
          .then((res) => {
            setAlertType("success");
            user.setIsAuth(true);
            user.setUserRole(res.role);
            user.setIsAdmin(res.role === Roles.ADMIN);
            navigate(USER_ROUTE);
          })
          .catch((error) => {
            setAlertType("error");
            console.log(error);
          });
        break;
      case "2":
        registration({ login: loginValue, password: passswordValue })
          .then((res) => {
            if (res === ResponseStatuses.SUCCESS) setOpenAlert(true);
            setAlertType("success");
          })
          .catch((error) => {
            setAlertType("error");
            console.log("error", error);
          });
        break;
      default:
        console.log("Error in tabs");
        break;
    }
    setOpenAlert(true);
    resetValues();
  };

  const onChangePassword = ({ target }) => {
    setPassswordValue(target.value);
  };
  const onChangeLogin = ({ target }) => {
    setLoginValue(target.value);
  };

  const resetValues = () => {
    setValue("1");
    setPassswordValue("");
    setBtnLabel("Login");
    setLoginValue("");
    setAlertType("success");
  };

  return (
    <div className={"main"} onClick={playVideo}>
      {showGradient ? (
        <div className={"overlay"}></div>
      ) : (
        <video
          src={process.env.BGVIDEO_PATH}
          loop
          className={"bgVideo"}
          autoPlay
        />
      )}
      <div className="content">
        <Card>
          <CardContent>
            <Tabs value={value} onChange={handleChange}>
              <Tab value="1" label="Login"></Tab>
              <Tab value="2" label="Registration"></Tab>
            </Tabs>
          </CardContent>
          <CardContent>
            <Stack spacing={2}>
              <TextField
                label="Login"
                variant="outlined"
                value={loginValue}
                onChange={onChangeLogin}
              />
              <TextField
                label="Password"
                variant="outlined"
                type={"password"}
                value={passswordValue}
                onChange={onChangePassword}
              />
            </Stack>
          </CardContent>
          <CardActions sx={{ justifyContent: "end" }}>
            <Button variant="outlined" onClick={authHandle}>
              {btnLabel}
            </Button>
          </CardActions>
        </Card>
      </div>
      <Snackbar
        open={openAlert}
        autoHideDuration={10000}
        onClose={() => setOpenAlert(false)}
      >
        <Alert severity={alertType}>
          {alertType === "success"
            ? ResponseStatuses.SUCCESS
            : ResponseStatuses.ERROR}
        </Alert>
      </Snackbar>
    </div>
  );
});

export default AuthPage;
