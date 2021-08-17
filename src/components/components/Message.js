import React , {useEffect , useState} from 'react';
import Text from '../components/Text'
import io from "socket.io-client";
import Socket from '../pages/Socket';
const socket = io();


function Message() {
    const [receivedMessagess, setReceivedMessagess] = useState(['1','2','3']);
    const numbers = [1, 2, 3, 4, 5];
    useEffect(()=>{
        socket.on('test', data => {
			console.log(data)
            setReceivedMessagess(prevState => [...prevState, data]);
		})
    },[])
    
    return (
        <div className='mt-5  h-80 border-2 max-w-xl mx-auto max-h-80 bg-white w-full rounded-xl shadow-md xl:max-w-2xl h-2/3 bg-gray-100'>
        <div className='text-center pl-2 pt-2 uppercase tracking-tight text-lg text-blue-700 font-semibold '>
            ROBOT MESSAGE
        </div>
        <div className="h-5/6 overflow-y-auto mb-10">
            <ul>
            {
            receivedMessagess.map((item)=> <Text text={item} />)
            }
            </ul>
          
        </div>
      {/* /<Text text={message} />      */}
   
     
    </div>
    )
}

export default Message
