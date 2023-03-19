import React from 'react'
import { useSelector } from 'react-redux'
import PartnerCard from '../../../components/PartnerCard';
import { selectPartners } from '../../../features/partnersSlice'
import Carousel from '../../../components/Carousel';

const Partners = () => {
	const partners = useSelector(selectPartners);
	return (
		<div className='my-12'>
			<h1 className='mb-12 max-sm:text-center'>Наші партнери</h1>
			<Carousel>
				{
					partners.map((item, index) => (
						<PartnerCard key={`${partners.title}/${index}`} partner={item} />
					))
				}
			</Carousel>
		</div>
	)
}

export default Partners