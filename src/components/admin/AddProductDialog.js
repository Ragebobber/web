import React, { useContext, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { ProductStatus } from "../../util/Consts";
import CloseIcon from "@mui/icons-material/Close";
import { addProduct } from "../../http/ProductHttp";
import { Context } from "../../index";
import { observer } from "mobx-react-lite";

const AddProductDialog = observer((props) => {
  const { productStore } = useContext(Context);
  const { onClose, open } = props;
  const [productStatus, setProductStatus] = useState(ProductStatus.ACTIVE);
  const [productName, setProductName] = useState("");
  const [productDescr, setProductDescr] = useState("");

  const handleProductStatusChange = (event) => {
    setProductStatus(event.target.value);
  };

  const addProductHandle = () => {
    const data = {
      name: productName,
      description: productDescr,
      status: productStatus,
    };
    addProduct(data)
      .then((res) => {
        productStore.setAllProducts([...productStore.allProducts, res]);
        onClose();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const edditNameHandle = (event) => {
    setProductName(event.target.value);
  };
  const edditDescriptionHande = (event) => {
    setProductDescr(event.target.value);
  };

  const isBtnDisabled = () => {
    return productName?.length === 0 || productDescr?.length === 0;
  };

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>
        Add new product
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
          <TextField
            variant={"outlined"}
            label={"Product Name"}
            sx={{ mt: 1 }}
            onChange={edditNameHandle}
          />
          <TextField
            variant={"outlined"}
            label={"Product description"}
            onChange={edditDescriptionHande}
          />

          <FormControl>
            <InputLabel>Product status</InputLabel>
            <Select
              variant={"outlined"}
              value={productStatus}
              onChange={handleProductStatusChange}
              input={<OutlinedInput label="Product status" />}
            >
              {Object.keys(ProductStatus).map((key) => (
                <MenuItem value={key} key={key}>
                  {key}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          variant={"outlined"}
          onClick={addProductHandle}
          disabled={isBtnDisabled()}
        >
          Add product
        </Button>
      </DialogActions>
    </Dialog>
  );
});

export default AddProductDialog;
