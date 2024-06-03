import AddDesgination from "./AddDesgination";
import Client from "./Client";
import Date from "./Date";
import Footer from "./Footer";
import ModePayment from "./ModePayment";
import Notes from "./Notes";
import Remise from "./Remise";
import TableVente from "./TableVente/index";

export default function index(){

    
  return (
    <div>
      <div className="flex flex-col gap-2    lg:flex-row lg:justify-between"> 
               
               <div>
                   <Client/>
               </div> 
                <div>
       
                   <div>
                       <Date/>
                   </div> 
      
                   <div>
                       <ModePayment /> 
                   </div>  
               </div> 
      </div> 


      
     
     
      
       <div className='my-5'>
           <AddDesgination /> 
       </div>
   
       <div className='my-12 bg-white shadow p-2 border rounded border-slate-400'>
           <TableVente /> 
       </div>
       <hr className='border-gray-400 w-[80%]  m-auto'/>
   
       <div className="flex flex-col lg:flex-row gap-2 justify-between items-start my-4">

           
           <div className='w-[100%] lg:w-[50%]'>
                   <Notes /> 
           </div>
           <div className='flex flex-col justify-start items-end '>
                <div>
                    <Remise/> 
               </div>
               
               <div>
                   <Footer/>
               </div> 
           </div>
       </div>
    </div>
  )
}
