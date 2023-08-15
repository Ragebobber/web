import React, { useContext, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { edditUserSubscription } from "../../http/SubscriptionHttp";
import { Context } from "../../index";
import { observer } from "mobx-react-lite";

const AddExDateDialog = observer((props) => {
  const { user } = useContext(Context);

  const { open, onClose, currentSub, userProps } = props;
  const [expirationDate, setExpirationDate] = useState(dayjs(new Date()));

  const setExpirationDateHandle = (newValue) => {
    setExpirationDate(newValue);
  };

  const onSaveClickHandle = () => {
    const data = {
      expirationDate: expirationDate.$d,
    };
    edditUserSubscription(currentSub.id, data)
      .then((res) => {
        const curUser = user.allUsers.find((elem) => elem.id === userProps.id);
        curUser.userSubscription.map((elem) => {
          if (elem.id === res.id) {
            Object.keys(res).forEach((key) => {
              elem[key] = res[key];
            });
            return elem;
          }
          return elem;
        });
        onClose();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth={"xs"} fullWidth>
      <DialogTitle>
        Add date Subscription
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              sx={{ mt: 1 }}
              label={"Expiration Date"}
              value={expirationDate}
              onChange={setExpirationDateHandle}
              slotProps={{
                textField: {
                  helperText: "MM/DD/YYYY",
                },
              }}
            />
          </LocalizationProvider>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button variant={"outlined"} onClick={onSaveClickHandle}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
});

export default AddExDateDialog;
