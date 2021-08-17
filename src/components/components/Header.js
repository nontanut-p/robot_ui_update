import React from 'react';
import SimplePeer from 'simple-peer'

function Header(status) {

	var d = new Date();
	var time = d.toLocaleTimeString();
	//console.log('ramUse', status.hardwareStatus[0].ramUsage, 'cpuUsage', status.hardwareStatus[0].cpuUsage, 'battery', status.hardwareStatus[0].battery, 'temp', status.hardwareStatus[0].temp, 'hardware', status.connectStatus)
	return (
		<div className='border-2 max-w-xl mx-auto bg-white rounded-xl shadow-md overflow-hidden xl:max-w-2xl'>
			<div className='text-center pl-2 pt-2 uppercase tracking-tight text-sm md:text-md text-blue-700 font-semibold'>
				CONNECTION STATUS : <span class={status.connectStatus == true ? 'text-green-500 ' : 'text-red-500 '}> {status.connectStatus == true ? 'Online' : 'Offline'} </span>    TIME : <span className='text-green-500' 	> {time}</span>
			</div>
			<div className='grid grid-cols-2 pb-3'>
				<div className='pl-5 pt-2 text-sm text-blue-700 font-light md:text-md '>
					<ul>
						<li>
							<i class='fas fa-trailer'></i> ROBOT MODE :{' '}
							<span class='text-green-400 '> Auto </span>
						</li>
						<li>
							<i class='fas fa-bolt'></i> DRIVER :{' '}
							<span class='text-green-400 '>
								test
							</span>
						</li>
						<li>
							<i class='fas fa-video'></i> CAMERA :{' '}
							<span class='text-red-400 '> NOT WORKING </span>
						</li>
						<li>
							<i class='fas fa-tint'></i> SPRAY :{' '}
							<span class='text-green-400 '> WORKING </span>
						</li>
						<li>
							<i class='fas fa-gamepad'></i> JOYSTICK :{' '}
							<span class='text-red-400 '> NOT WORKING </span>
						</li>
					</ul>
				</div>
				<div className='pt-2 text-sm md:text-md text-blue-700 font-light pl-10 '>
					<ul>
						<li>
							<i class='fas fa-microchip'></i> CPU USAGE :{' '}
							<span class='text-red-400 '> {status.hardwareStatus[0].cpuUsage}% </span>
						</li>
						<li>
							<i class='fas fa-memory'></i> RAM USAGE :{' '}
							<span class='text-red-400 '> {status.hardwareStatus[0].ramUsage}MB </span>
						</li>
						<li>
							<i class='fas fa-car-battery'></i> BATTERY :{' '}
							<span class='text-green-400 '> {status.hardwareStatus[0].battery}% </span>
						</li>
						<li>
							<i class='fas fa-temperature-low'></i> TEMPERATURE :{' '}
							<span class='text-green-400 '> {status.hardwareStatus[0].temp}°C </span>
						</li>
						<li>
							<i class='fas fa-tint'></i> SPRAY SHOTS :{' '}
							<span class='text-red-400 '> 321/10000 </span>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}

export default Header;
