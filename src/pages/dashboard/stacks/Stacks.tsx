import { useEffect, useState } from 'react'
import { PageCaption, StackSkeleton } from '../../../components'
import { API, instance } from '../../../hooks'
import { Card } from 'antd'
import type { StackType } from '../../../@types/StackType'
import { useNavigate } from 'react-router-dom'

const { Meta } = Card

const Stacks = () => {
	const [stacks, setStacks] = useState<Array<StackType>>([])
	const [loading, setLoading] = useState<boolean>(false)

	const navigate = useNavigate()

	useEffect(() => {
		getStacks()
	}, [])

	const getStacks = () => {
		setLoading(true)
		instance()
			.get('/stacks')
			.then(res => {
				setStacks(res.data.data)
			})
			.finally(() => setLoading(false))
	}
	return (
		<div className='p-5 h-screen flex flex-col gap-5'>
			<div className='bg-white p-5 rounded-md'>
				<PageCaption title="Yo'nalishlar" count={stacks.length} />
			</div>

			<div className='bg-white p-5 rounded-md flex-1 min-h-0'>
				<div className='h-full scrollbar-none overflow-y-auto'>
					<div className='flex flex-wrap justify-center gap-5 pb-[50px]'>
						{loading ? (
							<StackSkeleton />
						) : (
							stacks.map(item => (
								<Card
									onClick={() => navigate(`${item.id}`)}
									key={item.id}
									hoverable
									style={{ width: 260 }}
									cover={
										<img
											className='h-[200px] object-cover'
											alt='Stack image'
											src={`${API}/file/${item.image}`}
										/>
									}
								>
									<Meta
										title={item.name}
										description={`Yaratilgan sana: ${
											item.createdAt.split('T')[0]
										}`}
									/>
								</Card>
							))
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Stacks
