import React, { useEffect, useState } from 'react';
import Camera from '../components/Camera';
import Maps from '../components/Maps';
import Message from '../components/Message';
import DriverandGNSS from '../components/DriverandGNSS';
import io from 'socket.io-client';
const socket = io();

function Home({ video, gnssMessage }) {
	
	return (
	
		<div className="2xl:px-20 grid grid-cols-1 md:grid-cols-1 md:max-h-xl  mt-5 gap-1 lg:grid-cols-2">
			<Camera video={video} />
			<Maps gnssMessage={gnssMessage} />
			<Message />
			<DriverandGNSS gnssMessage={gnssMessage} />
		</div>
	);
}

export default Home;
