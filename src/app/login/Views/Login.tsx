import {  Alert,Button,  LinearProgress,  TextField,  } from "@mui/material"
import LoginIcon from '@mui/icons-material/Login';

import { credentialsType, useLogin } from "../Hooks/useLogin";
import Password from "../Components/Password";
import { useEffect } from "react";


function Login(){
  

 
  const {mutate,isLoading,responseError,register,handleSubmit,errors}=useLogin();


 
  useEffect(()=>{
    document.title="Se connecter"
  },[]);
  

  return (

    <div className="flex flex-col gap-2 lg:flex-row h-screen">

        <div className="login-logo  lg:w-[50%] xl:w-[35%]  lg:flex lg:flex-row lg:items-center lg:justify-center">
      
            <div className="hidden lg:block overlay"></div> 
            
            <div className="z-10 w-full text-white p-6 text-center opacity-85 lg:opacity-100 bg-slate-950">
              <p className="text-3xl mb-2 lg:text-4xl  uppercase font-extrabold">
                  Energy recovery  water tech
              </p>
             
              <p className="text-xl font-light">Gérer votre stock facilement.</p>
            </div>

        </div>

        <div className="login-box animated fadeInDown flex-grow flex flex-row items-center  justify-center ">
          
            <form className="mx-4 shadow-xl relative " onSubmit={handleSubmit((data:credentialsType)=>{mutate(data)})}>
                
               {isLoading && <div className="border left-0 top-[-1px] absolute w-full">
                  <LinearProgress />
              </div>}
               
             {errors.name?.message && <Alert severity="error" variant="standard" color="error" sx={{mb:2}}>
              
                 <p>{errors.name?.message}</p>
                 
              </Alert>}
              {errors.password?.message  && <Alert severity="error" variant="standard" color="error" sx={{mb:2}}>
              
            
                 <p>{errors.password?.message}</p>
              </Alert>}
             {responseError && 
                <Alert severity="error" variant="standard" color="error" sx={{mb:2}}>
                  
                
                  <p>{responseError}</p>
                </Alert>
             
             }
              <p className=" text-3xl md:text-4xl font-bold text-slate-950">Connexion</p>
              <p className="text-xl font-extralight text-gray-950 my-2">Connectez-vous à votre plateforme.</p>

             
             <TextField 
                  {...register("name",{required:"Le nom d'utilisateur est obligatoire ."})} 
                  fullWidth 
                  label="Username" 
                  margin="normal"
                
              />
             
            <Password register={register}/>
             
              <Button  type="submit" variant="contained" fullWidth endIcon={<LoginIcon/>} disabled={isLoading}>
                        Se connecter 
              </Button>

            </form>
        </div>
    </div>
  
  )
}

export default Login




  
