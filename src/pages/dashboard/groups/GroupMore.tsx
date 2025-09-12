import { ArrowLeftOutlined, DeleteFilled, EditFilled } from '@ant-design/icons'
import { Button, Modal } from 'antd'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { instance } from '../../../hooks'
import { toast } from 'react-toastify'
import type { GroupsType } from '../../../@types/GroupType'

const GroupMore = () => {
	const { id } = useParams()
	console.log(id)
	const navigate = useNavigate()

	const [groupData, setGroupData] = useState<GroupsType>()
	const [loading, setLoading] = useState(true)

	const [deleteLoading, setDeleteLoading] = useState(false)
	const [showModal, setShowModal] = useState(false)

	useEffect(() => {
		instance()
			.get(`/groups/${id}`)
			.then(res => {
				setGroupData(res.data)
			})
			.finally(() => setLoading(false))
	}, [id])

	// Delete group
	const handleDeleteGroup = () => {
		setDeleteLoading(true)
		instance()
			.delete(`/groups/${id}`)
			.then(() => {
				toast.success('Guruh muvaffaqiyatli o‘chirildi!', {
					onClose: () => {
						setDeleteLoading(false)
						setShowModal(false)
						navigate(-1)
					},
					autoClose: 1000,
				})
			})
			.catch(() => {
				toast.error('O‘chirishda xatolik!', {
					onClose: () => {
						setDeleteLoading(false)
						setShowModal(false)
					},
					autoClose: 1000,
				})
			})
	}

	if (loading) {
		return <p className='p-5'>Yuklanmoqda...</p>
	}

	return (
		<div className='p-5 h-[100vh] overflow-y-auto scrollbar-none'>
			<div className='flex items-center justify-between p-5 bg-white rounded-md'>
				<div className='flex items-center gap-[15px]'>
					<button onClick={() => navigate(-1)}>
						<ArrowLeftOutlined className='!text-[20px] cursor-pointer hover:scale-[1.1] duration-300' />
					</button>
					<h2 className='font-semibold text-[22px] capitalize'>
						{groupData?.name}
					</h2>
				</div>
				<div className='flex items-center gap-[15px]'>
					<Button
						onClick={() => setShowModal(true)}
						className='!bg-red-500'
						size='large'
						type='primary'
						icon={<DeleteFilled />}
					/>
					<Button
						onClick={() => navigate(`/groups/${id}/update`)}
						className='!bg-green-500'
						size='large'
						type='primary'
						icon={<EditFilled />}
					/>
				</div>
			</div>

			<div className='mt-[30px] flex gap-10 bg-white p-5 rounded-md'>
				<ul className='p-5 border-[2px] space-y-[20px] rounded-md border-slate-400 w-[50%]'>
					<li>
						<span className='text-slate-400'>#</span>
						<p className='text-[22px]'>{id}</p>
					</li>
					<li>
						<span className='text-slate-400'>Nomi</span>
						<p className='text-[22px] capitalize'>{groupData?.name}</p>
					</li>
					<li>
						<span className='text-slate-400'>Yaratilgan sana</span>
						<p className='text-[22px]'>
							{groupData?.createdAt.split('T')[0]} &&{' '}
							{groupData?.createdAt?.split('T')[1].split('.')[0]}
						</p>
					</li>
				</ul>
			</div>

			<Modal
				cancelText='Yo‘q'
				okText='Ha'
				okButtonProps={{ type: 'primary', className: '!bg-[#bc8e5b]' }}
				confirmLoading={deleteLoading}
				open={showModal}
				onCancel={() => setShowModal(false)}
				onOk={handleDeleteGroup}
				title='O‘chirish'
			>
				<p>Haqiqatan ham ushbu guruhni o‘chirib tashlamoqchimisiz? 🚨</p>
			</Modal>
		</div>
	)
}

export default GroupMore
