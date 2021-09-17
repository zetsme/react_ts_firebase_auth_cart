import { Button, Dialog, DialogActions, DialogTitle, Slide } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { forwardRef } from 'react';

interface AlertDialogProps {
  open: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
}

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children?: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const AlertDialog: React.FC<AlertDialogProps> = ({ open, handleClose, handleConfirm }) => {
  return (
    <Dialog TransitionComponent={Transition} keepMounted open={open} onClose={handleClose}>
      <DialogTitle id='alert-dialog-title'>Are you sure ?</DialogTitle>
      <DialogActions>
        <Button variant='contained' onClick={handleClose}>
          Disagree
        </Button>
        <Button variant='contained' color='secondary' onClick={handleConfirm}>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AlertDialog;
