import React, { useContext, useState } from "react";
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
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { activeSubscription } from "../../http/SubscriptionHttp";
import { Context } from "../../index";
import { observer } from "mobx-react-lite";
import AddSubscriptionDialog from "./AddSubscriptionDialog";
import AddExDateDialog from "./AddExDateDialog";
import dayjs from "dayjs";
import CloseIcon from "@mui/icons-material/Close";

const AdminUserSubscription = observer((props) => {
  const { user } = useContext(Context);
  const { open, onClose, userProp } = props;
  const [openAddSubDialog, setAddSubDialog] = useState(false);
  const [opedAddExDateDialog, setAddExDateDialoh] = useState(false);
  const [currentSub, setCurrnetSub] = useState({});

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

        // user.setAllUsers(
        //   user.allUsers.map((user) => (user.id === curUser.id ? curUser : user))
        // );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleAddSubscription = () => {
    setAddSubDialog(true);
  };

  const closeAddSubDialogHandle = () => {
    setAddSubDialog(false);
  };

  const handleAddExDateSub = (sub) => {
    setCurrnetSub(sub);
    setAddExDateDialoh(true);
  };

  const closeAddExDateSub = () => {
    setAddExDateDialoh(false);
    setCurrnetSub({});
  };

  return (
    <div>
      <Dialog onClose={onClose} open={open} maxWidth="md" fullWidth>
        <DialogTitle>
          <Stack spacing={1}>
            <Grid container>
              <Grid item xs={12} sx={{ textAlign: "end" }}>
                <IconButton aria-label="close" onClick={onClose}>
                  <CloseIcon />
                </IconButton>
              </Grid>
            </Grid>
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
          </Stack>
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
                              sub.productId.status === "ACTIVE"
                                ? "green"
                                : "red",
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
                        <Typography>
                          Ex date:{" "}
                          {dayjs(sub.expirationDate).format("DD/MM/YYYY")}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Stack>
                </AccordionDetails>
                <AccordionActions>
                  <Button
                    variant={"outlined"}
                    onClick={() => handleAddExDateSub(sub)}
                  >
                    Add ex date
                  </Button>
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
      <AddSubscriptionDialog
        open={openAddSubDialog}
        onClose={closeAddSubDialogHandle}
        userProps={userProp}
      />
      <AddExDateDialog
        open={opedAddExDateDialog}
        onClose={closeAddExDateSub}
        currentSub={currentSub}
        userProps={userProp}
      />
    </div>
  );
});

export default AdminUserSubscription;
