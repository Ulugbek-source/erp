import { useEffect, useState } from 'react'
import { PageCaption, StackSkeleton } from '../../components'
import { API, instance } from '../../hooks'
import { Button, Card, Modal, message } from 'antd'
import type { StackType } from '../../@types/StackType'
import { DeleteFilled, EditFilled } from '@ant-design/icons'

const { Meta } = Card

const Stacks = () => {
	const [stacks, setStacks] = useState<Array<StackType>>([])
	const [loading, setLoading] = useState<boolean>(false)
	const [showModal, setShowModal] = useState(false)
	const [selectedId, setSelectedId] = useState<number | null>(null)

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

	const handleDelete = () => {
		if (!selectedId) return
		setLoading(true)
		instance()
			.delete(`/stacks/${String(selectedId)}`)
			.then(() => {
				setStacks(prev => prev.filter(item => item.id !== selectedId))
				message.success('Stack muvaffaqiyatli o‘chirildi ✅')
			})
			.catch(err => {
				console.error('Delete error:', err.response || err)
				message.error(`O‘chirishda xatolik ❌ ${err.response?.status}`)
			})
			.finally(() => {
				setLoading(false)
				setShowModal(false)
				setSelectedId(null)
			})
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
									<div className='flex items-center justify-between mt-[20px]'>
										<Button
											className='!bg-green-500'
											size='large'
											type='primary'
											icon={<EditFilled className='!text-[17px]' />}
										/>
										<Button
											className='!bg-red-500'
											type='primary'
											size='large'
											icon={<DeleteFilled className='!text-[17px]' />}
											onClick={() => {
												setSelectedId(item.id)
												setShowModal(true)
											}}
										/>
									</div>
								</Card>
							))
						)}
					</div>
				</div>
			</div>
			<Modal
				cancelText='Yo‘q'
				okText='Ha, o‘chir'
				okButtonProps={{ type: 'primary', className: '!bg-red-500' }}
				confirmLoading={loading}
				open={showModal}
				onCancel={() => setShowModal(false)}
				onOk={handleDelete}
				title={'O‘chirish tasdiqlansin!'}
			>
				<p>Haqiqatan ham ushbu stackni o‘chirib tashlamoqchimisiz? 🚨</p>
			</Modal>
		</div>
	)
}

export default Stacks
