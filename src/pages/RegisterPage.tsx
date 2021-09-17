import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { authActionCreators } from '../state';
import Form from '../components/Form';
import { TextField, Button } from '@mui/material';

const initialState = {
  email: '',
  displayName: '',
  password: '',
};

const RegisterPage: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [inputValues, setInputValues] = useState(initialState);
  const { email, displayName, password } = inputValues;

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) =>
    setInputValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (email && displayName && password) {
      dispatch(authActionCreators.register(inputValues));
      history.push('/');
    }
  };
  return (
    <Form title='Register Form' fullheight='true' {...{ onSubmit }}>
      <TextField
        type='email'
        variant='outlined'
        label='Email'
        name='email'
        value={email}
        onChange={onChange}
      />
      <TextField
        type='text'
        variant='outlined'
        label='Full Name'
        name='displayName'
        value={displayName}
        onChange={onChange}
      />
      <TextField
        type='password'
        variant='outlined'
        label='Password'
        autoComplete='off'
        name='password'
        value={password}
        onChange={onChange}
      />
      <Button type='submit' size='large' variant='contained' color='primary'>
        Register
      </Button>
    </Form>
  );
};

export default RegisterPage;
