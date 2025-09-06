import { PageCaption } from '../../components'

const Groups = () => {
	return (
		<div className='p-5 h-screen flex flex-col gap-5'>
			<div className='bg-white p-5 rounded-md'>
				<PageCaption title='Guruhlar' count={10} />
			</div>
		</div>
	)
}

export default Groups
