import { PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'

const PageCaption = ({ title, count }: { title: string; count: number }) => {
	const navigate = useNavigate()
	return (
		<div className='flex items-center justify-between'>
			<div>
				<h2 className='font-bold text-[25px]'>{title}</h2>
				<span>
					({count}) {title.toLowerCase()}
				</span>
			</div>
			<Button
				onClick={() => navigate('create')}
				icon={<PlusOutlined />}
				className='!bg-[#bc8e5b]'
				size='large'
				type='primary'
			>
				Qo'shish
			</Button>
		</div>
	)
}

export default PageCaption
