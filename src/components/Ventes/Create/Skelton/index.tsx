import { Button, Skeleton } from "@mui/material";

export default function index(){

  return (
    <div>
      <div className="flex flex-row justify-between "> 
               
               <div className=" w-[500px] rounded-lg   items-stretch  ">
                    <Skeleton  animation="wave" variant="rectangular"  height={40}/>
                    <div className="p-4 bg-white border border-slate-200">
                        <Skeleton  animation="wave"   height={70}/>
                    </div>
               </div> 
                <div className="flex flex-col gap-2">
       
              
                    <div className="w-[350px] rounded-lg border border-slate-200">
                        <Skeleton animation="wave"  variant="rectangular"  height={40}/>
                        <div className="p-4 bg-white">
                            <Skeleton animation="wave"    height={70}/>
                        </div>
                
                    </div> 
        
                    
                    <div className="w-[350px] rounded-lg border border-slate-200">
                        <Skeleton animation="wave"  variant="rectangular"  height={40}/>
                        <div className="p-4 bg-white">
                            <Skeleton animation="wave"    height={70}/>
                        </div>
                    </div> 
                    
               </div> 
      </div> 


      
     
     
      
       <div className='my-5  flex flex-row bg-white px-6 py-4 gap-16 items-center'>
            <div className="w-[30%]"><Skeleton animation="wave"  variant="rectangular" height={40}/></div>
            <div className="w-[20%]"><Skeleton animation="wave"  variant="rectangular" height={40}/></div>
            <div className="w-[20%]"><Skeleton animation="wave"  variant="rectangular" height={40}/></div>
            <div className="flex-grow"></div>
            <Button disabled variant="contained">
                +
            </Button>
       </div>
   
       <div className='my-12 flex flex-col gap-2 bg-white shadow p-2 border  rounded border-slate-200'>
         <div className="w-[100%]"><Skeleton animation="wave"  variant="rectangular" height={40}/></div>
         <div className="w-[100%]"><Skeleton animation="wave"  variant="rectangular" height={20}/></div>
         <div className="w-[100%]"><Skeleton animation="wave"  variant="rectangular" height={20}/></div>
         <div className="w-[100%]"><Skeleton animation="wave"  variant="rectangular" height={20}/></div>
           
       </div>
       <hr className='border-gray-400 w-[80%]  m-auto'/>
   
       <div className="flex flex-row justify-between items-start my-4">

           <div className='w-[50%] rounded-lg border border-slate-200'>
                                
                <Skeleton animation="wave"  variant="rectangular"  height={40}/>
                <div className="p-4 bg-white">
                    <Skeleton animation="wave"   variant="text" height={20}/>
                    <Skeleton animation="wave"   variant="text" height={20}/>
                    <Skeleton animation="wave"   variant="text" height={20}/>
                    <Skeleton animation="wave"   variant="text" height={20}/>
                </div>
           </div>
           <div className='flex flex-col justify-start items-end '>
                    <div className="w-[350px] rounded-lg border border-slate-200">
                        <Skeleton animation="wave"  variant="rectangular"  height={40}/>
                        <div className="p-4 bg-white">
                            <Skeleton animation="wave"    height={70}/>
                        </div>
                    </div> 
               
              
                <div className="w-[350px] rounded-lg border border-slate-200">
                            <Skeleton animation="wave"  variant="rectangular"  height={40}/>
                            <div className="p-4 bg-white">
                                <Skeleton animation="wave"  variant="text" height={20}/>
                                <Skeleton animation="wave"  variant="text" height={20}/>
                                <Skeleton animation="wave"  variant="text" height={20}/>
                                <Skeleton animation="wave"  variant="text" height={20}/>
                                <Skeleton animation="wave"  variant="text" height={20}/>
                            </div>
                    </div> 
           </div>
       </div>
    </div>
  )
}
