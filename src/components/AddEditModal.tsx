import { Close } from '@mui/icons-material';
import { Backdrop, Button, Fab, Fade, Modal, TextField, styled } from '@mui/material';
import { Box } from '@mui/system';
import Form from './Form';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  maxWidth: '100%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface AddEditModalProps {
  open: boolean;
  editMode: boolean;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  handleClose: () => void;
  inputValues: {
    title: string;
    price: number;
    category: string;
    description: string;
    image: string;
  };
}

const CloseButton = styled(Fab)(({ theme }) => ({
  position: 'absolute',
  right: theme.spacing(1),
  top: theme.spacing(2),
}));

const AddEditModal: React.FC<AddEditModalProps> = ({
  open,
  onSubmit,
  editMode,
  onChange,
  handleClose,
  inputValues,
}) => {
  const { title, price, category, description, image } = inputValues;
  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <CloseButton onClick={handleClose} size='small' color='secondary'>
            <Close />
          </CloseButton>
          <Form title={editMode ? 'Update Product' : 'Add New Product'} onSubmit={onSubmit}>
            <TextField
              type='text'
              variant='outlined'
              label='Product Title'
              name='title'
              value={title}
              onChange={onChange}
            />
            <TextField
              type='text'
              variant='outlined'
              label='Category'
              name='category'
              value={category}
              onChange={onChange}
            />
            <TextField
              multiline
              rows={4}
              type='text'
              label='Description'
              name='description'
              value={description}
              onChange={onChange}
            />
            <TextField
              type='text'
              variant='outlined'
              label='Image URL'
              name='image'
              value={image}
              onChange={onChange}
            />
            <TextField
              variant='outlined'
              label='Price'
              type='number'
              placeholder='Price'
              name='price'
              value={price}
              onChange={onChange}
            />

            <Button variant='contained' type='submit'>
              {editMode ? 'Update Product' : 'Add New Product'}
            </Button>
          </Form>
        </Box>
      </Fade>
    </Modal>
  );
};

export default AddEditModal;
