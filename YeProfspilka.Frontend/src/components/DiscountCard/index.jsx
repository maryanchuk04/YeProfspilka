import React, { useEffect, useState } from 'react';
import QrcodeGenerator from '../QrcodeGenerator';
import SimpleModal from '../SimpleModal';
import Button from '../../ui/Buttons/Button';
import Loader from '../Loader';
import Timer from './Timer';
import { DiscountService } from '../../services/DiscountService';

const service = new DiscountService();

const DiscountCard = ({ discount, blocked = false }) => {
	const { name, withBarCode, withQrCode } = discount;
	const [isQrCodeModalOpen, setQrCodeModalOpen] = React.useState(false);
	const [isBarCodeOpen, setIsBarCodeOpen] = useState(false);

	const toggleQrCodeModal = () => {
		setIsBarCodeOpen(false);
		setQrCodeModalOpen(!isQrCodeModalOpen);
	};

	const toggleBarCodeModal = () => {
		setIsBarCodeOpen(!isBarCodeOpen);
	};

	return (
		<div
			className={`relative rounded-standart  my-5 h-22 py-3 items-center ${
				blocked ? 'bg-[#C1C1C1]' : 'bg-[#9AE19D]'
			}`}
		>
			<div className='w-11/12 flex justify-between items-center mx-auto'>
				<div>
					<p className='text-bold text-lg flex justify-between mb-0 items-center'>
						{name}
					</p>
					{!blocked && (
						<span className='text-black/60 max-sm:text-xs font-normal'>
							{withQrCode && !withBarCode && 'Ця знижка доступна тільки по QR коду'}
							{withBarCode &&
								!withQrCode &&
								'Ця знижка доступна тільки по Штрих коду'}
							{withBarCode &&
								withQrCode &&
								'Цю знижку можна сканувати будь яким способом'}
						</span>
					)}
					{blocked && (
						<p className='text-black/60 max-sm:text-xs font-normal'>
							Щоб розблокувати цю знижку вам потрібно сплатити профспілкові внески
						</p>
					)}
				</div>

				<div className=' flex justify-between gap-2'>
					{!blocked && (
						<React.Fragment>
							{withQrCode && (
								<Button
									onClick={toggleQrCodeModal}
									className='!h-12 !w-12 text-2xl px-3'
								>
									<i className='text-2xl fa-regular fa-qrcode'></i>
								</Button>
							)}
							{withBarCode && (
								<Button onClick={toggleBarCodeModal} className='!h-12 !w-12 px-2'>
									<i className='text-2xl fa-solid fa-barcode-read'></i>
								</Button>
							)}
						</React.Fragment>
					)}
				</div>
				{isQrCodeModalOpen && (
					<DiscountCardModal discount={discount} close={toggleQrCodeModal} />
				)}
				{isBarCodeOpen && (
					<DiscountCardModal
						discount={discount}
						close={toggleBarCodeModal}
						isQrDiscount={false}
					/>
				)}
			</div>
			{}
		</div>
	);
};

const DiscountCardModal = ({ discount, close, isQrDiscount = true }) => {
	const [loading, setLoading] = React.useState(true);
	const [isTimerStarted, setIsTimerStarted] = useState(true);
	const [qrCodeValue, setQrCodeValue] = useState('');

	useEffect(() => {
		if (isQrDiscount) {
			loadDiscount();
		} else {
			setLoading(false);
		}
	}, []);

	const loadDiscount = async () => {
		if (!isQrDiscount) {
			close();
		}
		setLoading(true);

		const { data } = await service.getQrCode(discount.id);
		const url = `${window.location.origin}/verify-discount/${data.discount.id}/${data.code}`;

		setQrCodeValue(url);
		setLoading(false);
		setIsTimerStarted(true);
	};

	return (
		<SimpleModal className='w-[320px] !h-fit'>
			<div>
				<p>#знижка</p>
				<h2>{discount.name}</h2>
				<p className=' text-ellipsis overflow-hidden'>{discount.description}</p>
				<div className='my-8 w-full '>
					{loading ? (
						<div className='grid place-items-center min-h-[300px] h-fit'>
							<Loader />
						</div>
					) : (
						<div className='grid place-items-center h-fit'>
							{isQrDiscount ? (
								<div className='mb-3'>
									<QrcodeGenerator size={250} value={qrCodeValue} />
								</div>
							) : (
								<React.Fragment>
									<div className=''>
										<img
											src={discount.barCodeImage}
											alt=''
											className='h-[250px] w-[350px]'
										/>
									</div>
								</React.Fragment>
							)}
							<Timer
								finishHandler={loadDiscount}
								isTimerStarted={isTimerStarted}
								setIsTimerStarted={setIsTimerStarted}
							/>
						</div>
					)}
				</div>
				<Button className='bg-primary' onClick={close}>
					Готово
				</Button>
			</div>
		</SimpleModal>
	);
};

export default DiscountCard;
