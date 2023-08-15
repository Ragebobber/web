import React from "react";
import { ListItemText, MenuItem, Paper } from "@mui/material";

const AdminMenu = (props) => {
  const { menuClickHandle, currentItem } = props;

  const data = [
    {
      id: 1,
      name: "Users",
    },
    {
      id: 2,
      name: "Products",
    },
    {
      id: 3,
      name: "LogOut",
    },
  ];

  return (
    <Paper>
      {data.map((elem) => {
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
    </Paper>
  );
};

export default AdminMenu;
