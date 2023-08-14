import React, { useContext, useEffect, useState } from "react";
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
  OutlinedInput,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { ProductStatus } from "../../util/Consts";
import CloseIcon from "@mui/icons-material/Close";
import { addProduct, edditProduct } from "../../http/ProductHttp";
import { Context } from "../../index";
import { observer } from "mobx-react-lite";

const AddProductDialog = observer((props) => {
  const { productStore } = useContext(Context);
  const { onClose, open, edditProps } = props;

  const [productStatus, setProductStatus] = useState(ProductStatus.ACTIVE);
  const [productName, setProductName] = useState("");
  const [productDescr, setProductDescr] = useState("");
  const [productTarget, setProductTarget] = useState("");

  const handleProductStatusChange = (event) => {
    setProductStatus(event.target.value);
  };

  const addProductHandle = () => {
    const data = {
      name: productName,
      description: productDescr,
      status: productStatus,
      altName: productTarget,
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

  const edditProductHandle = () => {
    const data = {
      id: edditProps.id,
      name: productName,
      description: productDescr,
      altName: productTarget,
    };
    edditProduct(data)
      .then((res) => {
        productStore.setAllProducts(localUpdateProducts(res));
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

  const openHandle = () => {
    return open;
  };

  const hasEdditProps = () => {
    return Object.keys(edditProps).length !== 0;
  };

  const localUpdateProducts = (res) => {
    return productStore.allProducts.map((product) =>
      product.id === res.id ? res : product
    );
  };

  const editProductTarget = (event) => {
    setProductTarget(event.target.value);
  };

  useEffect(() => {
    setProductName(edditProps.name);
    setProductDescr(edditProps.description);
    setProductTarget(edditProps.altName);
    //setProductStatus(ProductStatus[edditProps.status])
  }, [edditProps.name, edditProps.description, edditProps.altName]);

  return (
    <Dialog onClose={onClose} open={openHandle()}>
      <DialogTitle>
        {hasEdditProps() ? "Eddit product" : " Add new product"}

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
        <Stack spacing={1} sx={{ mt: 1 }}>
          <TextField
            variant={"outlined"}
            label={"Product Name"}
            sx={{ mt: 1 }}
            value={productName || ""}
            onChange={edditNameHandle}
          />

          <TextField
            variant={"outlined"}
            label={"Product Target"}
            value={productDescr || ""}
            onChange={editProductTarget}
          />
          <TextField
            variant={"outlined"}
            label={"Product description"}
            value={productDescr || ""}
            onChange={edditDescriptionHande}
          />
          {!hasEdditProps() && (
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
          )}
        </Stack>
      </DialogContent>
      <DialogActions>
        {!hasEdditProps() ? (
          <Button
            variant={"outlined"}
            onClick={addProductHandle}
            disabled={isBtnDisabled()}
          >
            Add product
          </Button>
        ) : (
          <Button
            variant={"outlined"}
            onClick={edditProductHandle}
            disabled={isBtnDisabled()}
          >
            Save
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
});

export default AddProductDialog;
