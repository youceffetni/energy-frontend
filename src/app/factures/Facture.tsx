import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { useSelector } from 'react-redux';
import { handleDialogClose, selectDialog } from '@/redux/features/dialogSlice';
import { useAppDispatch } from '@/redux/store';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Facture() {
  

  const {factureShow}=useSelector(selectDialog);
  const dispatch=useAppDispatch();

  return (
 
     
      <Dialog
        fullScreen
        open={factureShow}
        onClose={()=>dispatch(handleDialogClose("factureShow"))}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={()=>dispatch(handleDialogClose("factureShow"))}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Facture
            </Typography>
            <Button autoFocus color="inherit" onClick={()=>dispatch(handleDialogClose("factureShow"))}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        
      </Dialog>
   
  );
}