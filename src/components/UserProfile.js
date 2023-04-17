import React from "react";
import { Grid, Stack, TextField } from "@mui/material";
import { observer } from "mobx-react-lite";

const UserProfile = observer((props) => {
  const { user } = props;
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Stack spacing={2}>
          <TextField
            variant={"outlined"}
            label={"User name"}
            defaultValue={user.currentUser.login}
            disabled
          />
          <TextField
            variant={"outlined"}
            label={"Date of registration"}
            defaultValue={new Date(
              user.currentUser.dateOfRegistration
            ).toLocaleDateString([], {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
            disabled
          />
        </Stack>
      </Grid>
      <Grid item>1</Grid>
    </Grid>
  );
});

export default UserProfile;
