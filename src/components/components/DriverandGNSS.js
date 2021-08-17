import React from 'react';
import Text from '../components/Text';

function DriverandGNSS(gnssMessage) {
	let lat = gnssMessage.lat;
	let long = gnssMessage.lon;

	let alt = gnssMessage.alt;
	let dir = gnssMessage.dir;

	return (
		<div className="mt-5  border-2 max-w-xl mx-auto bg-white w-full rounded-xl shadow-md xl:max-w-2xl h-2/3 bg-gray-100  overflow-y-auto ">
			<div className="text-center pl-2 pt-2 uppercase tracking-tight text-lg text-blue-700 font-semibold ">
				Driver AND GNSS
			</div>
			<div className=" grid grid-cols-2  sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
				<div className="border-2 bg-blue-100 pl-3 rounded-md mx-2 my-2 text-blue-600 font-semibold ">
					<p>
						LAT : <span className="text-gray-600 font-light"> {lat}</span>{' '}
					</p>
				</div>
				<div className="border-2 bg-blue-100 pl-3 rounded-md mx-2 my-2 text-blue-600 font-semibold ">
					<p>
						LON : <span className="text-gray-600 font-light"> {long}</span>{' '}
					</p>
				</div>

				<div className="border-2 bg-blue-100 pl-3 rounded-md mx-2 my-2 text-blue-600 font-semibold ">
					<p>
						ALT :<span className="text-gray-600 font-light"> {alt} M</span>
					</p>
				</div>
				<div className="border-2 bg-blue-100 pl-3 rounded-md mx-2 my-2 text-blue-600 font-semibold ">
					<p>
						DIR :<span className="text-green-400"> Deg</span>{' '}
					</p>
				</div>
				<div className="border-2 bg-blue-100 pl-3 rounded-md mx-2 my-2 text-blue-600 font-semibold ">
					<p>
						VEL :<span className="text-gray-600 font-light"> m/s</span>{' '}
					</p>
				</div>
				<div className="border-2 bg-blue-100 pl-3 rounded-md mx-2 my-2 text-blue-600 font-semibold ">
					<p>
						DRIVE 1 :<span className="text-gray-600 font-light"> 1200</span>{' '}
					</p>
				</div>
				<div className="border-2 bg-blue-100 pl-3 rounded-md mx-2 my-2 text-blue-600 font-semibold ">
					<p>
						DRIVE 2:<span className="text-gray-600 font-light"> 1200</span>{' '}
					</p>
				</div>
				<div className="border-2 bg-blue-100 pl-3 rounded-md mx-2 my-2 text-blue-600 font-semibold ">
					<p>
						DRIVE 3 :<span className="text-gray-600 font-light"> 1200</span>{' '}
					</p>
				</div>
				<div className="border-2 bg-blue-100 pl-3 rounded-md mx-2 my-2 text-blue-600 font-semibold ">
					<p>
						DRIVE 4 :<span className="text-gray-600 font-light"> 1200</span>{' '}
					</p>
				</div>
				<div className="border-2 bg-blue-100 pl-3 rounded-md mx-2 my-2 text-blue-600 font-semibold ">
					<p>
						DRIVE 5 :<span className="text-gray-600 font-light"> 300</span>{' '}
					</p>
				</div>
				<div className="border-2 bg-blue-100 pl-3 rounded-md mx-2 my-2 text-blue-600 font-semibold ">
					<p>
						DRIVE 6 :<span className="text-gray-600 font-light"> 300</span>{' '}
					</p>
				</div>
				<div className="border-2 bg-blue-100 pl-3 rounded-md mx-2 my-2 text-blue-600 font-semibold ">
					<p>
						DRIVE 7 :<span className="text-gray-600 font-light"> 300</span>{' '}
					</p>
				</div>
				<div className="border-2 bg-blue-100 pl-3 rounded-md mx-2 my-2 text-blue-600 font-semibold ">
					<p>
						DRIVE 8 :<span className="text-gray-600 font-light"> 300</span>{' '}
					</p>
				</div>
			</div>
		</div>
	);
}

export default DriverandGNSS;
