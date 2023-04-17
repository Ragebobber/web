import React, { useContext } from "react";
import { adminRoutes, authedRoutes, publicRoutes } from "./Routes";
import { Navigate, Route, Routes } from "react-router-dom";
import { AUTH_ROUTE, USER_ROUTE } from "../util/Consts";
import { observer } from "mobx-react-lite";
import { Context } from "../index";

const AppRouter = observer(() => {
  const { user } = useContext(Context);

  return (
    <Routes>
      {user.isAdmin &&
        adminRoutes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} exact />
        ))}

      {(user.isAuth &&
        authedRoutes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} exact />
        ))) ||
        publicRoutes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} exact />
        ))}

      <Route
        path={"*"}
        element={<Navigate to={user.isAuth ? USER_ROUTE : AUTH_ROUTE} />}
      />
    </Routes>
  );
});

export default AppRouter;
