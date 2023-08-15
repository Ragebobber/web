import React, { useContext, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Context } from "../../index";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { addUserSubscription } from "../../http/SubscriptionHttp";
import { observer } from "mobx-react-lite";

const AddSubscriptionDialog = observer((props) => {
  const { productStore, user } = useContext(Context);
  const { onClose, open, userProps } = props;
  const [selectedProduct, setSelectedProduct] = useState("");
  const [expirationDate, setExpirationDate] = useState(dayjs(new Date()));

  const selectedProductChangeHandle = (event) => {
    setSelectedProduct(event.target.value);
  };

  const setExpirationDateHandle = (newValue) => {
    setExpirationDate(newValue);
  };

  const clickSaveHandle = () => {
    const data = {
      userId: userProps.id,
      productId: selectedProduct,
      expirationDate: expirationDate.$d,
    };

    addUserSubscription(data)
      .then((res) => {
        const curUser = user.allUsers.find((elem) => elem.id === userProps.id);
        curUser.userSubscription.push(res);
        onClose();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Dialog onClose={onClose} open={open} maxWidth="sm" fullWidth>
      <DialogTitle>
        Add subscription to User: {userProps.login}
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
          <FormControl fullWidth sx={{ mt: 1 }}>
            <InputLabel>Product</InputLabel>
            <Select
              value={selectedProduct}
              label={"Product"}
              onChange={selectedProductChangeHandle}
            >
              {productStore.allProducts.map((elem) => (
                <MenuItem value={elem.id} key={elem.id}>
                  {elem.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label={"Expiration Date"}
              value={expirationDate}
              onChange={setExpirationDateHandle}
            />
          </LocalizationProvider>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button variant={"outlined"} onClick={clickSaveHandle}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
});

export default AddSubscriptionDialog;
