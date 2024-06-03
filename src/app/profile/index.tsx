
import useProfile from "@/hooks/profile";
import { Alert, Button, TextField } from "@mui/material";



export default function index(){

    const {register,getValues}=useProfile();
    
 
  return (
    <div className="w-[70%] m-auto">
        <Alert sx={{my:"8px"}} severity="info" variant="outlined">
            Bienvenue <b>{getValues().username}</b> , sur la page de paramètres de vos données.
        </Alert>
        <div className="bg-white p-4  border border-slate-400 rounded-xl">
            <form>
                <TextField
                    className="w-full"
                    label="Nom d'utilisateur"
                    margin="dense"
                    {...register("username")}
                />
                <TextField
                    className="w-full"
                    label="password"
                    margin="dense"
                    {...register("password")}
                />
                <TextField
                    className="w-full"
                    label="password"
                    margin="dense"
                    {...register("password_confirmation")}
                />
                <div className="my-4">
                    <Button variant="contained" color="success">
                        Sauvgarder
                    </Button>
                </div>
            </form>
        </div>
    </div>
  )
}
