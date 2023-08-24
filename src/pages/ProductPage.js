import FormData from 'form-data';
import Validator from 'validatorjs';
// import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
// import { filter } from 'lodash';
// import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
// @mui
import {
  // Card,
  Table,
  Stack,
  // Paper,
  // Avatar,
  Button,
  // Popover,
  // Checkbox,
  // TableRow,
  // MenuItem,
  // TableBody,
  // TableCell,
  Container,
  Typography,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Modal,
  Box,
  TextField,
  InputLabel,
  Input,
  Alert,
  // IconButton,
  // TableContainer,
  // TablePagination,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { createProduct, deleteProduct, getProducts, minusQtyProduct, plusQtyProduct, updateProduct } from '../app/api/product';
import { getAllProduct } from '../app/features/product/actions';
// components
// import Label from '../components/label';
import Iconify from '../components/iconify';
// import Scrollbar from '../components/scrollbar';
// sections
// import { UserListHead, UserListToolbar } from '../sections/@dashboard/product';
// mock
import USERLIST from '../_mock/user';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export default function ProductPage() {
  const { dataProducts, dataUser } = useSelector(state => state);
  const dispatch = useDispatch();

  const [errors, setErrors] = useState({
    alert: null
  });
  const [titleModal, setTitleModal] = useState({
  });
  const [image, setImage] = useState({});

  //* Untuk Modal Input & Update
  const [value, setValue] = useState({});
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  //* Untuk Modal + & - QTY
  const [qErrors, setQErrors] = useState({
    alert: null
  });
  const [titleQModal, setTitleQModal] = useState({
  });
  const [qId, setQId] = useState({});
  const [qOpen, setQOpen] = useState(false);
  const handleQOpen = () => {
    setQOpen(true);
  };
  const handleQClose = () => {
    setQOpen(false);
  };


  useEffect(() => {
    getProduct();
    setValue({});
    setImage({});
  }, []);

  const getProduct = async () => {
    const response = await getProducts();
    const products = getAllProduct(response.data.data);
    dispatch(products);
  }

  const handleError = async (validation) => {
    validation.passes();
    const error = await validation.errors.errors;
    if (Object.keys(error).length !== 0) {
      setErrors({
        name: error.name,
        description: error.description,
        price: error.price,
        qty: error.qty,
      })
    } else {
      setErrors({ alert: null });
      const formdata = new FormData();
      formdata.append('name', value.name);
      formdata.append('description', value.description);
      formdata.append('price', value.price);
      formdata.append('qty', value.qty);
      formdata.append('image', image);
      if (titleModal.mode === 'Create') {
        const response = await createProduct(formdata);
        if (response.data.error === 1) {
          setErrors({ ...alert, alert: <Alert severity="error" style={{ marginBottom: "10px" }}>{response.data.message}</Alert> })
        } else {
          setErrors({ alert: null });
          setValue({});
          setImage({});
          setTitleModal({});
          getProduct();
          handleClose()
        }
      } else if (titleModal.mode === 'Update') {
        const response = await updateProduct(value._id, formdata);
        if (response.data.error === 1) {
          setErrors({ ...alert, alert: <Alert severity="error" style={{ marginBottom: "10px" }}>{response.data.message}</Alert> })
        } else {
          setErrors({ alert: null });
          setValue({});
          setImage({});
          setTitleModal({});
          getProduct();
          handleClose()
        }
      }
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, description, price, qty } = value;
    const data = { name, description, price, qty };
    const rules = {
      name: 'required|min:3',
      description: 'required|min:3',
      price: 'required|numeric',
      qty: 'required|numeric'
    }
    const validation = new Validator(data, rules);
    handleError(validation);
  }

  const handleInput = (e) => {
    const newObject = { ...value, [e.target.name]: e.target.value }
    setValue(newObject);
  }

  const setModel = (set, item = null) => {
    if (set === 'input') {
      setValue({});
      setImage({});
      setTitleModal({
        mode: 'Create',
        title: 'Create Data Product'
      });
      handleOpen();
    } else if (set === 'update') {
      setImage({});
      setValue(item);
      setTitleModal({
        mode: 'Update',
        title: 'Update Data Product'
      });
      handleOpen();
    }
  }

  // =====================Bagian Qty=========================================
  const setModelQty = (set, id) => {
    // const newQtyId = {[id]:id}
    setQId({ _id: id });
    if (set === '-') {
      setTitleQModal({
        mode: 'Minus',
        title: 'Qty Terjual'
      });
      handleQOpen();
    } else if (set === '+') {
      setTitleQModal({
        mode: 'Plus',
        title: 'Qty Masuk'
      });
      handleQOpen();
    }
  }

  const handleQInput = (e) => {
    const newObject = { ...qId, [e.target.name]: e.target.value }
    setQId(newObject);
  }

  const handleQError = async (validation) => {
    validation.passes();
    const error = await validation.errors.errors;
    if (Object.keys(error).length !== 0) {
      setQErrors({
        qty: error.qty,
      })
    } else {
      setErrors({ alert: null });
      const formdata = new FormData();
      formdata.append('qty', qId.qty);
      if (titleQModal.mode === 'Minus') {
        console.log('minus');
        const response = await minusQtyProduct(qId._id, formdata);
        if (response.data.error === 1) {
          setErrors({ ...alert, alert: <Alert severity="error" style={{ marginBottom: "10px" }}>{response.data.message}</Alert> })
        } else {
          setQErrors({ alert: null });
          setQId({});
          setTitleQModal({});
          getProduct();
          handleQClose();
        }
      } else if (titleQModal.mode === 'Plus') {
        console.log('plus');
        const response = await plusQtyProduct(qId._id, formdata);
        if (response.data.error === 1) {
          setErrors({ ...alert, alert: <Alert severity="error" style={{ marginBottom: "10px" }}>{response.data.message}</Alert> })
        } else {
          setQErrors({ alert: null });
          setQId({});
          setTitleQModal({});
          getProduct();
          handleQClose();
        }
      }
    }
  }

  const handleQSubmit = (e) => {
    e.preventDefault();
    const { _id, qty } = qId;
    const data = { _id, qty };
    const rules = {
      _id: 'required',
      qty: 'required|numeric'
    }
    const validation = new Validator(data, rules);
    handleQError(validation);
  }
  // =====================Bagian Akhir Qty=========================================

  const confirmDelete = async (id) => {
    const result = window.confirm("Apakah Anda yakin untuk menghapus");
    if (result) {
      await deleteProduct(id);
      getProduct();
    }
  }

  const rupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR"
    }).format(number);
  }

  return (
    <>
      <Helmet>
        <title> User | Minimal UI </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Product
          </Typography>
          {
            dataUser.user.role === 'admin' ? <Button variant="contained" onClick={(e) => setModel('input')} startIcon={<Iconify icon="eva:plus-fill" />}>
              Product
            </Button> : ''
          }
        </Stack>

        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">#</TableCell>
                <TableCell align="left">Image</TableCell>
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">Price</TableCell>
                <TableCell align="left">Qty</TableCell>
                {
                  dataUser.user.role === 'admin' ? <TableCell align="center">Action</TableCell> : ''
                }
              </TableRow>
            </TableHead>
            <TableBody>

              {
                dataProducts.data?.map((item, i) => (
                  <TableRow key={`row-${i}`}>
                    <TableCell align="left">1</TableCell>
                    <TableCell align="left">{
                      item.image_url ? <img src={`http://localhost:3001/images/${item.image_url}`} alt="cover" width={200} height={200} /> : '-'
                    }</TableCell>
                    <TableCell align="left">{item.name}</TableCell>
                    <TableCell align="left">{rupiah(item.price)}</TableCell>
                    <TableCell align="left">{item.qty}</TableCell>
                    {
                      dataUser.user.role === 'admin' ? <TableCell align="center">
                        <Button variant="contained" color="primary" style={{ marginRight: '5px' }} onClick={(e) => setModelQty('-', item._id)}>
                          - QTY
                        </Button>
                        <Button variant="contained" color="success" style={{ marginRight: '5px' }} onClick={(e) => setModel('update', item)}>
                          Edit
                        </Button>
                        <Button variant="contained" color="error" style={{ marginRight: '5px' }} onClick={e => confirmDelete(item._id)}>
                          Delete
                        </Button>
                        {
                          item.qty === 0 ? <Button variant="contained" color="primary" onClick={(e) => setModelQty('+', item._id)}>
                            + QTY
                          </Button> : ''
                        }
                      </TableCell> : ''
                    }
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </TableContainer>
      </Container >
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: '50%' }}>
          <h2 id="parent-modal-title">{titleModal.title}</h2>
          {
            errors?.alert !== null ? errors.alert : ''
          }
          <form onSubmit={handleSubmit} encType='multipart/form-data'>
            <Stack>
              <TextField onChange={handleInput} name="name" label="Name Product" value={value ? value.name : ''} />
              <small style={{ marginBottom: '10px', color: 'red' }}>{errors ? errors.name : ''}</small>
            </Stack>

            <Stack>
              <TextField onChange={handleInput} name="description" label="Description Product" value={value ? value.description : ''} />
              <small style={{ marginBottom: '10px', color: 'red' }}>{errors ? errors.description : ''}</small>
            </Stack>

            <Stack>
              <InputLabel htmlFor="image">Image Product</InputLabel>
              <Input type='file' name='image' id='image' onChange={(e) => setImage(e.target.files[0])} />
              <small style={{ marginBottom: '10px', color: 'red' }}> </small>
            </Stack>

            <Stack>
              <TextField onChange={handleInput} name="price" label="Price Product" type='number' value={value ? value.price : ''} />
              <small style={{ marginBottom: '10px', color: 'red' }}>{errors ? errors.price : ''}</small>
            </Stack>
            {/* <Stack>
              <TextField type='number' onChange={handleInput} name="qty" label="Qty Product" value={value ? value.qty : ''} />
              <small style={{ marginBottom: '10px', color: 'red' }}>{errors ? errors.qty : ''}</small>
            </Stack> */}
            {
              titleModal.mode === 'Update' ? <TextField type='hidden' onChange={handleInput} name="qty" value={value.qty} /> : <Stack>
                <TextField type='number' onChange={handleInput} name="qty" label="Qty Product" />
                <small style={{ marginBottom: '10px', color: 'red' }}>{errors ? errors.qty : ''}</small>
              </Stack>
            }

            <LoadingButton fullWidth size="large" type="submit" variant="contained" style={{ marginTop: "15px" }}>
              Submit
            </LoadingButton>
          </form>
        </Box>
      </Modal>
      <Modal
        open={qOpen}
        onClose={handleQClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: '50%' }}>
          <h2 id="parent-modal-title">{titleQModal.title}</h2>
          {
            qErrors?.alert !== null ? qErrors.alert : ''
          }
          <form onSubmit={handleQSubmit} encType='multipart/form-data'>
            <Stack>
              <TextField type='number' onChange={handleQInput} name="qty" label="Qty Product" />
              <small style={{ marginBottom: '10px', color: 'red' }}>{qErrors ? qErrors.qty : ''}</small>
            </Stack>

            <LoadingButton fullWidth size="large" type="submit" variant="contained" style={{ marginTop: "15px" }}>
              Submit
            </LoadingButton>
          </form>
        </Box>
      </Modal>
    </>
  );
}
