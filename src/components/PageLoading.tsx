import { LogoImg } from '../assets/images'

const PageLoading = () => {
	return (
		<div className='flex items-center justify-center h-[100vh]'>
			<img
				className='logo-img'
				src={LogoImg}
				alt='Logo image'
				width={100}
				height={100}
			/>
		</div>
	)
}

export default PageLoading
