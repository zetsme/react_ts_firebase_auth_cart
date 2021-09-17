import { Container, Typography, styled } from '@mui/material';

interface FormProps {
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  title: string;
  fullheight?: string;
}

const FormStyled = styled('form')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  flex: 1,
}));

const FormContainer = styled(Container)<{
  fullheight?: string;
}>(({ theme, fullheight }) => ({
  ...(fullheight && {
    height: `calc(100vh - 56px)`,
    [`${theme.breakpoints.up('xs')} and (orientation: landscape)`]: {
      height: `calc(100vh - 48px)`,
    },
    [theme.breakpoints.up('sm')]: {
      height: `calc(100vh - 64px)`,
    },
  }),
  display: 'flex',
  alignItems: 'center',
}));

const Form: React.FC<FormProps> = ({ children, onSubmit, title, fullheight }) => {
  return (
    <FormContainer fullheight={fullheight} maxWidth='xs' disableGutters>
      <FormStyled onSubmit={onSubmit}>
        <Typography variant='h4' align='center'>
          {title}
        </Typography>
        {children}
      </FormStyled>
    </FormContainer>
  );
};
export default Form;
