import React from 'react'

const Socials = () => {
	const socials = [
		{
			icon: "fa-brands fa-instagram",
			text: "instagram",
			link: "https://www.instagram.com/studprofkom.cv.ua/",
		},
		{
			icon: "fa-brands fa-facebook",
			text: "facebook",
			link: "https://www.instagram.com/studprofkom.cv.ua/",
		},
		{
			icon: "fa-brands fa-instagram",
			text: "facebook",
			link: "https://www.instagram.com/studprofkom.cv.ua/",
		},
	]

	return (
		<div id='socials' className='my-32'>
			<h1 className='my-12 max-sm:text-center'>Ми в соц мережах</h1>
			<div className='flex flex-wrap my-5 justify-between gap-10 max-sm:flex-col'>
				{
					socials.map((item) => (
						<a href={item.link} target='_blanck' key={item.text} className="cursor-pointer flex-1 flex items-center border-2 border-primary text-black rounded-standart py-4 justify-center">
							<i className={`${item.icon} text-4xl mr-4`}></i>
							<p className='text-xl'>{item.text}</p>
						</a>
					))
				}
			</div>
		</div>

	)
}

export default Socials