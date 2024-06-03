import * as React from 'react';

import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';


import Tooltip from '@mui/material/Tooltip';

import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { ExpandMore } from '@mui/icons-material';
import { Button, Chip, ListItemAvatar} from '@mui/material';
import { axiosEnergy } from '@/config/axios.config';
import { useAuth } from '@/Providers/AuthProvider';
import { Link } from 'react-router-dom';



export default function AccountMenu() {

  const {setUserAuth,userAuth}=useAuth();
  const handleLogout=()=>{
    axiosEnergy.get("/logout");
    setUserAuth(null);
    handleClose();
  }
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <React.Fragment>
     
        
        <Tooltip title="Mon compte">
            
        
                <Button 
                    sx={{textTransform:"none",color:"#fff"}}
                    startIcon={<Avatar sx={{ width: 32, height: 32 }}>{userAuth?.name[0]}</Avatar>}
                    onClick={handleClick}
                        size="small"
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                     {userAuth?.name} <ExpandMore />
                </Button>
               
         
        </Tooltip>
  
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
   
           <div className='flex flex-row items-center justify-center my-2'>
              <ListItemAvatar  >
                  <Avatar sx={{ width: 40, height: 40 }}>{userAuth?.name[0]}</Avatar>
              </ListItemAvatar>
              <div>
                <h1 className='text-center'>{userAuth?.name} </h1>
            
                <h1>
                  <Chip label={userAuth?.role==1 ?"Super admin" : "Admin"} color="warning" size="small" variant="filled" />
                </h1> 
              </div>

           </div>
      
      

        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          <Link to="/profile">Paramétres</Link>
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Se déconnecter
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
