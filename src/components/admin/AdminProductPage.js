import React, { useContext, useState } from "react";
import { Box, Button, Grid, Stack } from "@mui/material";
import { activeProduct, deleteProduct } from "../../http/ProductHttp";
import { Context } from "../../index";
import { DataGrid } from "@mui/x-data-grid";
import AddProductDialog from "./AddProductDialog";
import { observer } from "mobx-react-lite";

const toolbar = (props) => {
  const { productProps, handleClickFn } = props;

  const getStatus = () => {
    return productProps.status === "ACTIVE" ? "DEACTIVE" : "ACTIVE";
  };

  const btns = [
    {
      id: 0,
      label: getStatus(),
    },
    {
      id: 1,
      label: "Eddit",
    },
    {
      id: 2,
      label: "Delete",
    },
  ];

  return (
    <Grid container spacing={1} sx={{ p: 1 }}>
      {btns.map((btn) => (
        <Grid item xs={2} key={btn.id}>
          <Button
            variant="outlined"
            onClick={() => handleClickFn(btn.id)}
            fullWidth
          >
            {btn.label}
          </Button>
        </Grid>
      ))}
    </Grid>
  );
};

const AdminProductPage = observer(() => {
  const { productStore } = useContext(Context);

  const [selectedRow, setSelectedRow] = useState({});
  const [open, setOpen] = React.useState(false);

  const columns = [
    { field: "id", headerName: "ID", type: "number", flex: 0 },
    {
      field: "name",
      headerName: "Name",
      type: "String",
      flex: 0,
    },
    {
      field: "status",
      headerName: "Status",
      type: "String",
      flex: 0,
    },
    {
      field: "description",
      headerName: "Description",
      type: "String",
      flex: 0,
    },
  ];

  // useEffect(() => {
  //   getProducts()
  //     .then((res) => {
  //       productStore.setAllProducts(res);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, [productStore]);

  const rowClick = ({ row }) => {
    if (selectedRow?.id === row.id) {
      setSelectedRow({});
      return;
    }
    setSelectedRow(row);
  };

  const toolbarClickHandle = (val) => {
    switch (val) {
      case 0:
        activeProduct(selectedRow.id)
          .then((res) => {
            productStore.setAllProducts(localUpdateProducts(res));
          })
          .catch((error) => {
            console.log(error);
          });
        break;
      case 1:
        setOpen(true);
        break;
      case 2:
        deleteProduct(selectedRow.id)
          .then((res) => {
            productStore.setAllProducts(
              productStore.allProducts.filter((elem) => elem.id !== res.id)
            );
          })
          .catch((error) => {
            console.log(error);
          });
        break;
      default:
        console.log("error click");
        break;
    }
  };

  const localUpdateProducts = (res) => {
    setSelectedRow({});
    return productStore.allProducts.map((product) =>
      product.id === res.id ? res : product
    );
  };

  const addProductHandle = () => {
    setSelectedRow({});
    setOpen(true);
  };

  const addProductHandleClose = () => {
    setSelectedRow({});
    setOpen(false);
  };

  return (
    <Box>
      <Stack spacing={2}>
        <Grid container>
          <Grid item xs={3}>
            <Button variant={"outlined"} onClick={addProductHandle}>
              Add product
            </Button>
          </Grid>
        </Grid>
        <DataGrid
          columns={columns}
          rows={productStore.allProducts}
          pageSize={5}
          rowsPerPageOptions={[5]}
          autoHeight
          onRowClick={rowClick}
          rowSelectionModel={
            Object.keys(selectedRow).length !== 0 ? selectedRow.id : 0
          }
          slots={{
            toolbar: Object.keys(selectedRow).length !== 0 ? toolbar : null,
          }}
          slotProps={{
            toolbar: {
              handleClickFn: toolbarClickHandle,
              productProps: selectedRow,
            },
          }}
        />
      </Stack>
      <AddProductDialog
        open={open}
        onClose={addProductHandleClose}
        edditProps={selectedRow}
      />
    </Box>
  );
});

export default AdminProductPage;
