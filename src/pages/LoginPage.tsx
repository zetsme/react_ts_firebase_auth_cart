import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { authActionCreators } from '../state';
import { TextField, Button } from '@mui/material';
import Form from '../components/Form';

const initialState = {
  email: '',
  password: '',
};

const LoginPage: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [inputValues, setInputValues] = useState(initialState);
  const { email, password } = inputValues;

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) =>
    setInputValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (email && password) {
      dispatch(authActionCreators.login(inputValues));
      history.push('/');
    }
  };
  return (
    <Form title='Login Form' fullheight='true' {...{ onSubmit }}>
      <TextField
        type='email'
        label='Email'
        variant='outlined'
        name='email'
        value={email}
        onChange={onChange}
      />
      <TextField
        type='password'
        label='Password'
        variant='outlined'
        autoComplete='off'
        name='password'
        value={password}
        onChange={onChange}
      />
      <Button size='large' variant='contained' color='primary' type='submit'>
        Log In
      </Button>
    </Form>
  );
};

export default LoginPage;
