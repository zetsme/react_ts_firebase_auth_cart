import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { actionCreators } from '../state';
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
      dispatch(actionCreators.login(inputValues));
      history.push('/');
    }
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type='email' placeholder='Email' name='email' value={email} onChange={onChange} />
        <input
          type='password'
          placeholder='Password'
          autoComplete='off'
          name='password'
          value={password}
          onChange={onChange}
        />
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
};

export default LoginPage;
