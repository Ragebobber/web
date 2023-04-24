import React, { useContext } from "react";
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { activeSubscription } from "../../http/SubscriptionHttp";
import { Context } from "../../index";
import { observer } from "mobx-react-lite";

const AdminUserSubscription = observer((props) => {
  const { user } = useContext(Context);
  const { open, onClose, userProp } = props;

  const setActiveBtnLabel = (sub) => {
    return sub.active ? "Deactive" : "Active";
  };

  const handleDeactiveSub = (data) => {
    activeSubscription(data)
      .then((res) => {
        const curUser = user.allUsers.find((elem) => elem.id === userProp.id);
        curUser.userSubscription.map((elem) => {
          if (elem.id === res.id) {
            Object.keys(res).forEach((key) => {
              elem[key] = res[key];
            });
            return elem;
          }
          return elem;
        });
        user.setAllUsers(
          user.allUsers.map((user) => (user.id === curUser.id ? curUser : user))
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleAddSubscription = () => {
    console.log("add Sub");
  };

  return (
    <Dialog onClose={onClose} open={open} maxWidth="md" fullWidth>
      <DialogTitle>
        <Grid container>
          <Grid item xs={6}>
            <Typography variant={"h6"}>Subscriptions</Typography>
          </Grid>
          <Grid item xs={6} sx={{ textAlign: "end" }}>
            <Button variant={"outlined"} onClick={handleAddSubscription}>
              Add subscription
            </Button>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>Login: {userProp?.login}</DialogContentText>
        <Stack spacing={2}>
          {userProp.userSubscription.map((sub) => (
            <Accordion key={sub.id}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Grid container spacing={1}>
                  <Grid item xs={3}>
                    <Typography>{sub.productId.name}</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography>
                      Product status:
                      <Typography
                        variant={"span"}
                        sx={{
                          color:
                            sub.productId.status === "ACTIVE" ? "green" : "red",
                        }}
                      >
                        {sub.productId.status}
                      </Typography>
                    </Typography>
                  </Grid>
                </Grid>
              </AccordionSummary>
              <AccordionDetails>
                <Stack>
                  <Grid container>
                    <Grid item xs={4}>
                      <Typography>
                        Subscription active status:{" "}
                        <Typography
                          variant={"span"}
                          sx={{
                            color: sub.active ? "green" : "red",
                          }}
                        >
                          {sub.active ? "ACTIVE" : "DEACTIVE"}
                        </Typography>
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography>Ex date: {sub.expirationDate}</Typography>
                    </Grid>
                  </Grid>
                </Stack>
              </AccordionDetails>
              <AccordionActions>
                <Button
                  variant={"outlined"}
                  onClick={() => handleDeactiveSub(sub)}
                >
                  {setActiveBtnLabel(sub)}
                </Button>
              </AccordionActions>
            </Accordion>
          ))}
        </Stack>
      </DialogContent>
    </Dialog>
  );
});

export default AdminUserSubscription;
