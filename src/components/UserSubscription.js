import React from "react";
import { Card, CardContent, Grid, Stack } from "@mui/material";

const UserSubscription = (props) => {
  const { subs } = props;

  const enableRedColor = (elem) => {
    return !elem.active || elem.productId.status !== "ACTIVE";
  };

  return (
    <Stack spacing={2}>
      {subs.map((elem) => (
        <Card
          key={elem.id}
          sx={{ backgroundColor: enableRedColor(elem) ? "red" : "green" }}
        >
          <CardContent>
            <Grid container spacing={1} sx={{ alignItems: "center" }}>
              <Grid item xs={4}>
                Name: {elem.productId.name}
              </Grid>
              <Grid item xs={4}>
                Active: {elem.active.toString()}
              </Grid>
              <Grid item xs={4}>
                Expiration date: {elem.expirationDate}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
};

export default UserSubscription;
