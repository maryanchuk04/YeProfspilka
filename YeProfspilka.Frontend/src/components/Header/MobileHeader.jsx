import React, { useState } from 'react'
import Hamburger from './Hamburger';
import Container from '../Container';
import MobileMenuContent from './MobileMenuContent';
import RegistrationForm from '../RegistrationForm';

const MobileHeader = () => {
	const [menuOpen, setMenuOpen] = useState(false);
	const [headerState, setHeaderState] = useState(0);

	const handleClick = () => {
		setMenuOpen(!menuOpen);
		setHeaderState(0);
	}

	const renderModileHeaderContent = () => {
		switch (headerState) {
			case 0: {
				return <MobileMenuContent setHeaderState={setHeaderState} />
			}
			case 1: {
				return (
					<div>
						<p className='mb-16 text-white'>#реєстрація</p>
						<RegistrationForm className='bg-white p-3 rounded-standart' />
					</div>
				)
			}
			case 2: {
				return (
					<div></div>
				)
			}

		}
	}

	return (
		<header className={`flex w-full flex-col py-4 ${menuOpen && "bg-primary fixed top-0 z-30"}`}>
			<Container>
				<div className='flex justify-between items-center relative'>
					<div className='w-20 h-20'>
						<img src="/images/logo-big.png" alt="profspilka-logo" className='w-full h-full' />
					</div>
					<Hamburger isOpen={menuOpen} setIsOpen={handleClick} />
				</div>
			</Container>
			{menuOpen && (
				<div className='bg-primary mt-24 h-full w-full fixed top-0 left-0 z-40'>
					<Container className='h-full py-5'>
						{renderModileHeaderContent()}
					</Container>
				</div>
			)}
		</header>
	)
}

export default MobileHeader