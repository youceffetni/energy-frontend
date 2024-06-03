import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import { axiosEnergy } from '@/config/axios.config';
import { useAppDispatch } from '@/redux/store';
import { handleRefetch } from '@/redux/features/dialogSlice';
import { FactureInterface } from '@/Interfaces/factures';
import { enqueueSnackbar } from 'notistack';
import { useView } from '@/Providers/OverViewProvider';


interface IProps{
 

  facture:FactureInterface;
  
}

export default function FactureActions({facture}:IProps) {
  const dispatch=useAppDispatch();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const {setOpenFacture,setFacture}=useView();

  const handleApercu=()=>{
    setFacture(facture)
    setOpenFacture(true);
    handleClose();
  }

  const handleDelete=()=>{
    axiosEnergy.delete(`/factures/${facture.numero}`)
    .then((response)=>{

        if(response.status==204){

          dispatch(handleRefetch()) 
          enqueueSnackbar(`La suppression a été effectuée avec succès`, { variant: "success", autoHideDuration: 2000 });
        }
          
    })
    .catch((error)=>{
      console.log(error)
    })
    handleClose();
  }

  const handlePublish=()=>{
    axiosEnergy.put(`/factures/${facture.numero}`)
    .then((response)=>{

        if(response.status==204){

          dispatch(handleRefetch()) 
         
        }
          
    })
    .catch((error)=>{
      console.log(error)
    })
    handleClose();
  }
  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreHorizIcon />
      </IconButton>

      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        
      >
        
          <MenuItem   onClick={handleApercu}>
              <div className="flex gap-2 items-center">
                <VisibilityIcon color="primary"/>
                <div>Aperçu</div>
              </div>
          </MenuItem>
          <MenuItem  onClick={handleDelete}>
              <div className="flex gap-2 items-center">
                
                <DeleteIcon color="error"/> 
                <div>Supprimer</div>
              </div>
          </MenuItem>
          {facture.etat==0 &&<MenuItem  onClick={handlePublish}>
              <div className="flex gap-2 items-center">
                 <DoneIcon color="success"/> 
                <div>Publier</div>
              </div>
          </MenuItem>}
      
      </Menu>
    </div>
  );
}
