import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ApiCart from '../apis/cart'

export default function AlertPopup({open, setOpen,idDelete}) {

  const handleDelete = async() => {
    try {
        let array = [idDelete]
        console.log(array)
        let params = {cids : array}
        let res = await ApiCart.delete(params)
        console.log(res)
    } catch (error) {
        console.log(error)
    }
  }

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Hành động không thể truy hồi."}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn thật sự muốn xóa sản phẩm đã chọn khỏi giỏi hàng ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Quay lại</Button>
          <Button onClick={() => handleDelete()} autoFocus>
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
