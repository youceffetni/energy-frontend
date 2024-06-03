import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import * as React  from 'react';
import {  UseFormRegister } from 'react-hook-form';
import { credentialsType } from '../Hooks/useLogin';

interface IProps{   
register:UseFormRegister<credentialsType>
}

export default function Password({register}:IProps){
    const [showPassword, setShowPassword] =React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
    };

  return (
    <FormControl margin="normal" variant="outlined" fullWidth={true}>
                  <InputLabel  htmlFor="outlined-adornment-password">Password</InputLabel>
                  <OutlinedInput
                      {...register("password",{required:"Le mot de pass est obligatoire ."})} 
                      fullWidth  
                      
                    
                      type={showPassword ? 'text' : 'password'}
                        endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                              >
                                                  {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                      }
                      label="Password"/>
              </FormControl> 
  )
}
