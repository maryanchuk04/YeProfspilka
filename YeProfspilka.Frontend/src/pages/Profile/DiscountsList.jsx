import React from 'react'
import DiscountCard from '../../components/DiscountCard'
import { MemberStatus } from '../../types/memberStatus';

const DiscountsList = ({ status, discounts }) => {
	const availableDiscounts = discounts.filter(x => x.isBlocked === false);
	const notAvailableDiscounts = discounts.filter(x => x.isBlocked === true);

	const renderStatus = () => {
		switch (status) {
			case MemberStatus.STUDENT: return (
				<div>
					<h2>Персональні знижки</h2>
					{
						availableDiscounts.map((item) => (
							<DiscountCard key={item.code} discount={item} blocked={false} disabled={false} />
						))
					}
					{
						notAvailableDiscounts.map((item) => (
							<div key={item.code} className='relative'>
								<DiscountCard key={item.code} discount={item} blocked={true} />
								<div className='absolute rounded-standart grid place-items-center top-0 z-30 backdrop-blur-sm h-full w-full'>
									<div className='bg-black w-1/2 p-4 text-center rounded-standart'>
										<p className='text-white'>НЕ має доступу</p>
										<p className='text-white/50'>Щоб відкрити доступ потрібно стати членом профспілки</p>
									</div>
								</div>
							</div>
						))
					}
				</div>
			)
			case MemberStatus.MEMBER_PROFSPILKA: return (
				discounts.map((item) => (
					<DiscountCard key={item.code} discount={item} />
				))
			)
			case MemberStatus.NOT_VERIFICATED: return (
				<div className='w-full h-full relative'>
					<div className=''>
						{
							discounts.map((item) => (
								<DiscountCard key={item.code} discount={item} disabled={true} />
							))
						}
					</div>
					<div className='absolute top-0 left-0  h-full w-full grid place-items-center'>

						<div className='bg-black h-20 grid place-items-center w-fit p-5 rounded-standart text-white'>
							<h2 className='text-center'>Ви не пройшли верифікацію!</h2>
						</div>
					</div>
				</div>
			)
		}
	}

	return (
		<div className='bg-[#E6E6E6] px-12 w-3/4 py-8 rounded-standart max-h-[900px] overflow-y-auto'>
			{renderStatus()}
			{discounts && (
				<div>
					<h2>У вас ще немає знижок!</h2>
				</div>
			)}
		</div>
	)
}

export default DiscountsList