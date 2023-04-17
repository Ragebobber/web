import React from "react";
import { ListItemText, MenuItem, MenuList, Paper } from "@mui/material";

const UserPageMenu = (props) => {
  const { menuClickHandle, currentItem } = props;

  const data = [
    {
      id: 1,
      name: "Profile",
    },
    {
      id: 2,
      name: "Subscription",
    },
    {
      id: 3,
      name: "LogOut",
    },
  ];

  return (
    <Paper>
      <MenuList variant={"menu"}>
        {data.map((elem, index) => {
          return [
            <MenuItem
              key={elem.id}
              onClick={() => menuClickHandle(elem.name)}
              selected={elem.name === currentItem}
            >
              <ListItemText>{elem.name}</ListItemText>
            </MenuItem>,
          ];
        })}
      </MenuList>
    </Paper>
  );
};

export default UserPageMenu;
