import 'bootstrap/dist/css/bootstrap.min.css';
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
import { Form } from 'react-bootstrap';
import { LoadingButton } from '@mui/lab';
// import { Option } from '@mui/joy';
import { createProduct, deleteProduct, getProducts, minusQtyProduct, plusQtyProduct, updateProduct } from '../app/api/product';
import { getAllProduct } from '../app/features/product/actions';
// components
// import Label from '../components/label';
import Iconify from '../components/iconify';
// import Scrollbar from '../components/scrollbar';
// sections
// import { UserListHead, UserListToolbar } from '../sections/@dashboard/product';
// mock
import { createUser, getUsers, updateUser } from '../app/api/user';
import { getAllUsers } from '../app/features/user/actions';
import { cekUserLogin } from '../utils/cekUserLogin';
import { userLogin } from '../app/features/auth/actions';

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

export default function UsersPage() {
  const { dataUser, dataUsers } = useSelector(state => state);
  const dispatch = useDispatch();

  const [errors, setErrors] = useState({
    alert: null
  });
  // const [users, setUsers] = useState([]);
  const [titleModal, setTitleModal] = useState({
  });

  //* Untuk Modal Input & Update
  const [value, setValue] = useState({});
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const user = cekUserLogin();

  useEffect(() => {
    users();
    const userl = userLogin(user);
    dispatch(userl);
    setValue({});
  }, []);

  const users = async () => {
    const response = await getUsers();
    const users = getAllUsers(response.data.data);
    dispatch(users);
  }

  const handleError = async (validation) => {
    validation.passes();
    const error = await validation.errors.errors;
    if (Object.keys(error).length !== 0) {
      setErrors({
        full_name: error.fullname,
        email: error.email,
        password: error.newpassword,
        role: error.role,
      })
    } else {
      setErrors({ alert: null });
      const formdata = new FormData();
      if (titleModal.mode === 'Create') {
        formdata.append('full_name', value.full_name);
        formdata.append('email', value.email);
        formdata.append('password', value.newpassword);
        formdata.append('role', value.role);
        const response = await createUser(formdata);
        if (response.data.error === 1) {
          setErrors({ ...alert, alert: <Alert severity="error" style={{ marginBottom: "10px" }}>{response.data.message}</Alert> })
        } else {
          setErrors({ alert: null });
          setValue({});
          setTitleModal({});
          users();
          handleClose()
        }
      } else if (titleModal.mode === 'Update') {
        formdata.append('full_name', value.full_name);
        formdata.append('email', value.email);
        formdata.append('role', value.role);
        if (value.newpassword === undefined || value.newpassword === '') {
          formdata.append('password', null);
        } else {
          formdata.append('password', value.newpassword);
        }
        const response = await updateUser(value._id, formdata);
        console.log(response);
        if (response.data.error === 1) {
          setErrors({ ...alert, alert: <Alert severity="error" style={{ marginBottom: "10px" }}>{response.data.message}</Alert> })
        } else {
          setErrors({ alert: null });
          setValue({});
          setTitleModal({});
          users();
          handleClose()
        }
      }
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, role, newpassword } = value;
    const fullname = value.full_name;
    const data = { fullname, email, role, newpassword };
    let rules;
    if (titleModal.mode === 'Create') {
      rules = {
        fullname: 'required|min:3',
        email: 'required|email',
        role: 'required',
        newpassword: 'required'
      }
    } else if (titleModal.mode === 'Update') {
      rules = {
        fullname: 'required|min:3',
        email: 'required|email',
        role: 'required',
      }
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
      setTitleModal({
        mode: 'Create',
        title: 'Create Data Product'
      });
      handleOpen();
    } else if (set === 'update') {
      setValue(item);
      setTitleModal({
        mode: 'Update',
        title: 'Update Data Product'
      });
      handleOpen();
    }
  }
  const confirmDelete = async (id) => {
    const result = window.confirm("Apakah Anda yakin untuk menghapus");
    if (result) {
      await deleteProduct(id);
      users();
    }
  }
  return (
    <>
      <Helmet>
        <title> DMA </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Users
          </Typography>
          {
            dataUser?.user?.role === 'admin' ? <Button variant="contained" onClick={(e) => setModel('input')} startIcon={<Iconify icon="eva:plus-fill" />}>
              User
            </Button> : ''
          }
        </Stack>

        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">#</TableCell>
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">Email</TableCell>
                <TableCell align="left">Role</TableCell>
                {
                  dataUser?.user?.role === 'admin' ? <TableCell align="center">Action</TableCell> : ''
                }
              </TableRow>
            </TableHead>
            <TableBody>

              {
                dataUsers.data.map((item, i) => (
                  <TableRow key={`row-${i}`}>
                    <TableCell align="left">1</TableCell>
                    <TableCell align="left">{item.full_name}</TableCell>
                    <TableCell align="left">{item.email}</TableCell>
                    <TableCell align="left">{item.role}</TableCell>
                    {
                      dataUser?.user?.role === 'admin' ? <TableCell align="center">
                        <Button variant="contained" color="success" style={{ marginRight: '5px' }} onClick={(e) => setModel('update', item)}>
                          Edit
                        </Button>
                        <Button variant="contained" color="error" style={{ marginRight: '5px' }} onClick={e => confirmDelete(item._id)}>
                          Delete
                        </Button>
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
              <TextField onChange={handleInput} name="full_name" label="Full Name" value={value ? value.full_name : ''} />
              <small style={{ marginBottom: '10px', color: 'red' }}>{errors ? errors.full_name : ''}</small>
            </Stack>

            <Stack>
              <TextField onChange={handleInput} name="email" label="Email" type='email' value={value ? value.email : ''} />
              <small style={{ marginBottom: '10px', color: 'red' }}>{errors ? errors.email : ''}</small>
            </Stack>

            <Stack>
              <TextField onChange={handleInput} name="newpassword" label="Password" type='password' />
              <small style={{ marginBottom: '10px', color: 'red' }}>{errors ? errors.password : ''}</small>
            </Stack>

            <Stack>
              <Form.Select className='mb-2' name='role' onChange={handleInput} label="Role">
                {
                  value.role === 'admin' ?
                    <>
                      <option value="admin" selected>admin</option><option value="coAdmin">co admin</option>
                    </> : value.role === 'coAdmin' ?
                      <>
                        <option value="coAdmin" selected>co admin</option><option value="admin">admin</option>
                      </> : value.role === undefined || value.role === null ? <>
                        <option value="admin">admin</option><option value="coAdmin">co admin</option>
                      </> : ''
                }
              </Form.Select>
              <small style={{ marginBottom: '10px', color: 'red' }}>{errors ? errors.role : ''}</small>
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
