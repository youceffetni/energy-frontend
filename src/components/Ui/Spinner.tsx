
interface IProps{
w:string;
h:string;
}

export default function Spinner({w,h}:IProps){

  return (
    <div
    className={`inline-block ${w} ${h} animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-warning motion-reduce:animate-[spin_1.5s_linear_infinite]`}
    role="status">
    <span
    className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
    >Loading...</span>
    </div>
  )
}
