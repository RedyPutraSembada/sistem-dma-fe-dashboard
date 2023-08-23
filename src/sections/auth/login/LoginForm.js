import FormData from 'form-data';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Validator from 'validatorjs';
import { useDispatch } from "react-redux";
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';

import { loginUser } from '../../../app/api/auth';
import { userLogin } from '../../../app/features/auth/actions';
// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [value, setValue] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({
    alert: null,
  });
  const [showPassword, setShowPassword] = useState(false);

  // const handleClick = () => {
  //   navigate('/dashboard', { replace: true });
  // };

  const handleError = async (validation) => {
    validation.passes();
    try {
      const err = await validation.errors.errors;
      if (Object.keys(err).length !== 0) {
        setErrors({
          email: err.email,
          password: err.password
        })
      } else {
        setErrors({ alert: null });
        const formData = new FormData();
        formData.append("email", value.email);
        formData.append("password", value.password);
        try {
          // console.log('test');
          const response = await loginUser(formData);
          console.log(response.data);
          if (response.data.error === 1) {
            await setErrors({ ...alert, alert: <Alert severity="error" style={{ marginBottom: "10px" }}>{response.data.message}</Alert> });
            console.log('error');
          } else {
            setErrors({ alert: null });
            console.log(response.data);
            const dataUserLogin = userLogin(response.data);
            dispatch(dataUserLogin);
            const { type, payload } = dataUserLogin;
            console.log(dataUserLogin);
            console.log(type);
            console.log(payload);
            const data = {
              user: payload.user,
              token: payload.token
            }
            localStorage.setItem('auth', JSON.stringify(data))
            navigate('/dashboard/app');
          }
        } catch (err) {
          console.error(err);
        }
      }

    } catch (error) {
      console.log(error);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = value;

    const data = { email, password };
    const rules = {
      email: 'required|email',
      password: 'min:3|required'
    }

    const validation = new Validator(data, rules);
    handleError(validation);
  }

  const handleInput = (e) => {
    const newObject = { ...value, [e.target.name]: e.target.value };
    setValue(newObject);
  }

  return (
    <>
      {
        errors?.alert !== null ? errors.alert : ''
      }
      <form onSubmit={handleSubmit}>
        <Stack>
          <TextField name="email" label="Email address" onChange={handleInput} />
          <small style={{ marginBottom: '10px', color: 'red' }}> {errors ? errors.email : ''}</small>
        </Stack>

        <Stack>
          <TextField
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            onChange={handleInput}
          />
          <small style={{ marginBottom: '10px', color: 'red' }}> {errors ? errors.password : ''}</small>
        </Stack>

        <LoadingButton fullWidth size="large" type="submit" variant="contained" style={{ marginTop: "15px" }}>
          Login
        </LoadingButton>
      </form>
    </>
  );
}
