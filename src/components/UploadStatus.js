import {BsFillCheckCircleFill} from 'react-icons/bs';
import {MdError} from 'react-icons/md';
const Upload=({content,status})=>{
return <div className='absolute w-[60%] h-[50px] shadow-md gap-[8px] translate-x-[-50%] bg-white rounded-[8px] left-[50%] flex items-center justify-center'>
        <p>{content}</p>
        {status?<BsFillCheckCircleFill size='26' color='#4da801'/>:<MdError size='26' color='#d72828'/>}
    </div>
}

export default Upload;