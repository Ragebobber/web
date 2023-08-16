import React from "react";
import {
  Divider,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
} from "@mui/material";
import { downloadClient } from "../http/FileHttp";
import fileDownload from "js-file-download";

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

  const handleDownloadClient = () => {
    downloadClient()
      .then((res) => {
        fileDownload(res.data, "client.zip");
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
        <Divider />
        <MenuItem onClick={() => handleDownloadClient()}>
          <ListItemText>Download client</ListItemText>
        </MenuItem>
      </MenuList>
    </Paper>
  );
};

export default UserPageMenu;
