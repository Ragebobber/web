import React, { useContext, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import CloseIcon from "@mui/icons-material/Close";
import { FileDownload } from "@mui/icons-material";
import { Context } from "../../index";
import { addFile } from "../../http/FileHttp";

const AddFileDialog = observer((props) => {
  const { productStore } = useContext(Context);

  const { open, onClose } = props;
  const [file, setFile] = React.useState("");
  const [fileBinary, setFileBinary] = React.useState([]);
  const inputFile = React.useRef(null);
  const [selectedProduct, setSelectedProduct] = useState("");
  const handleClickFile = () => {
    inputFile.current.click();
  };
  const handleUploadChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = function (event) {
      if (event.target.readyState === FileReader.DONE) {
        const arrayBuffer = event.target.result,
          array = new Uint8Array(arrayBuffer);
        const fileByteArray = [];
        for (const elem of array) {
          fileByteArray.push(elem);
        }
        setFileBinary(fileByteArray);
      }
    };
    //
    reader.readAsArrayBuffer(file);
    setFile(file.name);
  };

  const selectedProductChangeHandle = (event) => {
    setSelectedProduct(event.target.value);
  };

  const onSaveClickHandle = () => {
    const data = {
      file: fileBinary,
      productId: selectedProduct,
    };
    console.log(data);
    addFile(data)
      .then((res) => {
        onClose();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const showSaveBtn = () => {
    return fileBinary.length !== 0 || selectedProduct === "";
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth={"xs"} fullWidth>
      <DialogTitle>
        Add File
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
            aria-readonly
            variant={"outlined"}
            label={"File Name"}
            value={file}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickFile}>
                    {<FileDownload />}
                    <input
                      type="file"
                      ref={inputFile}
                      style={{ display: "none" }}
                      onChange={handleUploadChange}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
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
        </Stack>
      </DialogContent>
      <DialogActions>
        {showSaveBtn() && (
          <Button variant={"outlined"} onClick={onSaveClickHandle}>
            Save
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
});

export default AddFileDialog;
