import React from 'react';
import { Link } from 'react-router-dom'

export default function Navbar({ fixed }) {
	const [navbarOpen, setNavbarOpen] = React.useState(false);
	return (
		<>
			<nav className='relative flex flex-wrap items-center justify-between px-2 py-1 bg-blue-800 mb-3 border-2 border-blue-900'>
				<div className='container px-4 mx-auto flex flex-wrap items-center justify-between '>
					<div className='w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start '>
						<Link
							className='text-3xl font-bold leading-relaxed inline-block mr-4 py-0 whitespace-nowrap uppercase text-white hover: transform hover:-translate-y-1 hover:scale-110'
							to='/'
						>
							<i class='fas fa-robot'></i> ROBOT
						</Link>
						<button
							className='text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none'
							type='button'
							onClick={() => setNavbarOpen(!navbarOpen)}
						>
							<i className='fas fa-bars'></i>
						</button>
					</div>
					<div
						className={
							'lg:flex flex-grow items-center' +
							(navbarOpen ? ' flex' : ' hidden')
						}
						id='example-navbar-danger'
					>
						<ul className='flex flex-col lg:flex-row list-none lg:ml-auto'>
							<li className='nav-item '>
								<a
									className='hover: transform hover:-translate-y-1 hover:scale-110 px-3 py-2 flex items-center text-md uppercase font-bold leading-snug text-white hover:opacity-75'
									href='#pablo'
								>
									<i className='far fa-share-square text-md leading-lg text-white opacity-75 '></i>
									<span className='ml-3'>LOG OUT</span>
								</a>
							</li>
							<li className='nav-item'>
								<a
									className=' hover: transform hover:-translate-y-1 hover:scale-110 px-3 py-2 flex items-center text-md uppercase font-bold leading-snug text-white hover:opacity-75'
									href='#pablo'
								>
									<i className='fas fa-download text-md leading-lg text-white opacity-75'></i>
									<span className='ml-2'>SAVE</span>
								</a>
							</li>
							<li className='nav-item'>
								<a
									className='hover: transform hover:-translate-y-1 hover:scale-110 px-3 py-2 flex items-center text-md uppercase font-bold leading-snug text-white hover:opacity-75'
									href='#pablo'
								>
									<i className='fas fa-print text-md leading-lg text-white opacity-75'></i>
									<span className='ml-2'>PRINT</span>
								</a>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</>
	);
}
