import { makeStyles, Container, Typography } from '@material-ui/core';

interface FormProps {
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  title: string;
}

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
    flex: 1,
  },
  root: {
    height: `calc(100vh - 56px)`,
    [`${theme.breakpoints.up('xs')} and (orientation: landscape)`]: {
      height: `calc(100vh - 48px)`,
    },
    [theme.breakpoints.up('sm')]: {
      height: `calc(100vh - 64px)`,
    },
    display: 'flex',
    alignItems: 'center',
  },
}));

const AuthForm: React.FC<FormProps> = ({ children, onSubmit, title }) => {
  const classes = useStyles();
  return (
    <Container
      classes={{
        root: classes.root,
      }}
      maxWidth='xs'
      disableGutters
    >
      <form className={classes.form} onSubmit={onSubmit}>
        <Typography variant='h4' align='center'>
          {title}
        </Typography>
        {children}
      </form>
    </Container>
  );
};
export default AuthForm;
