import React from 'react';

function Camera({ video }) {
	//console.log(video.video, 'from camera')
	return (
		<div className=' border-2 max-w-xl mx-auto bg-white rounded-xl shadow-md overflow-hidden xl:max-w-2xl bg-gray-100'>
			<div className='text-center pl-2 pt-2 uppercase tracking-tight text-lg text-blue-700 font-semibold '>
				CAMERA 1
			</div>
			<div>
				<div className='px-3 py-3 '>
					<div className="photo">
						<img className='img' src={`data:image/jpeg;base64,${video.video}`} />

					</div>
				</div>

				<div className='px-2 grid grid-cols-4 gap-4 pb-2'>
					<button className='hover: transform hover:-translate-y-1 hover:scale-110  hover:text-black text-white font-semibold rounded-full bg-green-400'>
						{' '}
						CAM1
					</button>
					<button className='hover: transform hover:-translate-y-1 hover:scale-110  hover:text-black  text-white font-semibold rounded-full bg-green-400'>
						CAM2
					</button>
					<button className='hover: transform hover:-translate-y-1 hover:scale-110 hover:text-black   text-white font-semibold rounded-full bg-green-400'>
						CAM3
					</button>
					<button className='hover: transform hover:-translate-y-1 hover:scale-110  hover:text-black text-white font-semibold rounded-full bg-green-400'>
						OFF{' '}
					</button>
				</div>
			</div>
		</div>
	);
}

export default Camera;
