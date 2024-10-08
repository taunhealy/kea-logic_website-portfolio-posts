import Link from 'next/link'
import React from 'react'

const Footer = () => {
	return (
		<footer className='w-screen py-10 bg-[#212529]'>
			<section className='w-full py-10 grid grid-cols-3 font-lora text-white justify-center'>
				<div className='mx-auto'>
					<h2 className='text-[14px] mb-2 md:text-2xl'>Contact</h2>
					<ul>
						<li className='cursor-not-allowed'>info@blog.com</li>
						<li>+944 450 904 505</li>
					</ul>
				</div>
				<div className='mx-auto'>
					<h2 className='text-[14px] mb-2 md:text-2xl'>Legal</h2>
					<div className='flex flex-col gap-2'>
						<Link href='/' className='cursor-not-allowed'>
							Terms
						</Link>
						<Link href='/' className='cursor-not-allowed'>
							Privcy
						</Link>
					</div>
				</div>
				<div className='mx-auto'>
					<h2 className='text-[14px] mb-2 md:text-2xl'>Connect</h2>
					<div className='flex flex-col gap-2'>
						<Link href='/' className='cursor-not-allowed'>
							Facebook
						</Link>
						<Link href='/' className='cursor-not-allowed'>
							Twitter
						</Link>
						<Link href='/' className='cursor-not-allowed'>
							Instagram
						</Link>
					</div>
				</div>
			</section>
		</footer>
	)
}

export default Footer
