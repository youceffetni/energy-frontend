export const RegisterValidation ={
    name:{required:"le nom d'utilisateur est obligatoire.",},
    email:{
        required:"l'email  est obligatoire.",
        pattern:{
            value:/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
            message:"Svp ,Taper un email valide ."
        }
    },
    password:{required:"le mot de passe est obligatoire.",},
    password_confirmation:{required:"la confirmation de mot de passe est obligatoire.",}
}