import React from 'react';
import { useSelector } from 'react-redux';
import EventCard from '../../../components/EventCard';
import { selectEvents } from '../../../features/eventsSlice';
import Button from '../../../ui/Buttons/Button';

const Events = () => {
	const events = useSelector(selectEvents)

	return (
		<div className='w-full my-4'>
			<h1 className='my-12 max-sm:text-center'>Проведені події</h1>
			<div className='flex w-full flex-wrap justify-between my-6'>
				{
					events.map((event) => (
						<EventCard key={event.id} event={event} />
					))
				}
			</div>
			<div className='w-80 max-sm:w-full'>
				<Button>
					<div className='flex items-center justify-between px-3'>
						<p>Всі події</p>
						<span className='text-2xl'>&#8599;</span>
					</div>
				</Button>
			</div>
		</div>
	)
}

export default Events