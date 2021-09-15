import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { authActionCreators } from '../state';
import AuthForm from '../UIcomponents/AuthForm';
import { TextField, Button } from '@material-ui/core';

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
    <AuthForm title='Register Form' {...{ onSubmit }}>
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
    </AuthForm>
  );
};

export default RegisterPage;
