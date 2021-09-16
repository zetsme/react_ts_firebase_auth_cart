import { Container, Typography, styled } from '@mui/material';

interface FormProps {
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  title: string;
}

const Form = styled('form')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  flex: 1,
}));

const FormContainer = styled(Container)(({ theme }) => ({
  height: `calc(100vh - 56px)`,
  [`${theme.breakpoints.up('xs')} and (orientation: landscape)`]: {
    height: `calc(100vh - 48px)`,
  },
  [theme.breakpoints.up('sm')]: {
    height: `calc(100vh - 64px)`,
  },
  display: 'flex',
  alignItems: 'center',
}));

const AuthForm: React.FC<FormProps> = ({ children, onSubmit, title }) => {
  return (
    <FormContainer maxWidth='xs' disableGutters>
      <Form onSubmit={onSubmit}>
        <Typography variant='h4' align='center'>
          {title}
        </Typography>
        {children}
      </Form>
    </FormContainer>
  );
};
export default AuthForm;
