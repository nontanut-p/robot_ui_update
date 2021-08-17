import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Navbar from './components/layouts/Navbar';
import Home from './components/pages/Home';
import Socket from './components/pages/Socket';
import Header from './components/components/Header';
import Maps from './components/components/Maps';
import Footer from './components/components/Footer';
import { useState, useEffect } from 'react';

import SimplePeer from 'simple-peer';
import Peer from './Peer';
function App() {
	const [computerStatus, setcomputerStatus] = useState([
		{
			cpuUsage: 0,
			ramUsage: 0,
			battery: 0,
			temp: 0,
		},
	]);
	const [connectStatus, setConnectStatus] = useState(false);
	const [gazebosimll, setGazebosimll] = useState()
	useEffect(() => {
		setInterval(() => {
			setcomputerStatus([
				{
					cpuUsage: Peer[0].cpuUsage,
					ramUsage: Peer[0].ramUsage,
					battery: Peer[0].battery,
					temp: Peer[0].temp,
				},
			]);
			setConnectStatus(Peer[1]);
		}, 1000);
	}, 0);

	return (
		<Router>
			<Switch>
				<Route exact path="/">
					{' '}
					<div>
						<Navbar />
					</div>
					<Header
						hardwareStatus={computerStatus}
						connectStatus={connectStatus}
					/>
					<Home video={Peer[2]} />
					<Footer />
				</Route>
				<Route exact path="/map">
					<Maps/>
				</Route>
				<Route exact path="/test">
					<Socket />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
