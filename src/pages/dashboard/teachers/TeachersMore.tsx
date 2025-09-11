import { ArrowLeftOutlined, DeleteFilled, EditFilled } from '@ant-design/icons'
import { Button, Modal } from 'antd'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { instance } from '../../../hooks'
import { toast } from 'react-toastify'
import type { TeacherType } from '../../../@types/TeacherType'

const TeachersMore = () => {
	const { id } = useParams()
	const navigate = useNavigate()
	// Delete state
	const [teacherData, setTeacherData] = useState<TeacherType>()
	const [loading, setLoading] = useState<boolean>(true)

	const [deleteLoading, setDeleteLoading] = useState(false)
	const [showModal, setShowModal] = useState(false)

	useEffect(() => {
		instance()
			.get(`/teachers/${id}`)
			.then(res => {
				setTeacherData(res.data)
			})
			.finally(() => setLoading(false))
	}, [id])

	const handleDeleteTeacher = () => {
		setDeleteLoading(true)
		instance()
			.delete(`/teachers/${id}`)
			.then(() => {
				toast.success('O‘qituvchi muvaffaqiyatli o‘chirildi!', {
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
						{teacherData?.name} {teacherData?.surname}
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
						onClick={() => navigate(`/teachers/${id}/update`)}
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
						<span className='text-slate-400'>Ism Familiya</span>
						<p className='text-[22px]'>
							{teacherData?.name} {teacherData?.surname}
						</p>
					</li>
					<li>
						<span className='text-slate-400'>Email</span>
						<p className='text-[22px]'>{teacherData?.email}</p>
					</li>
				</ul>
				<ul className='p-5 border-[2px] space-y-[20px] rounded-md border-slate-400 w-[50%]'>
					<li>
						<span className='text-slate-400'>Telefon</span>
						<p className='text-[22px]'>{teacherData?.phone}</p>
					</li>
					<li>
						<span className='text-slate-400'>Tajriba</span>
						<p className='text-[22px]'>{teacherData?.experience}</p>
					</li>
					<li>
						<span className='text-slate-400'>Holati</span>
						<p className='text-[22px]'>{teacherData?.status?.name}</p>
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
				onOk={handleDeleteTeacher}
				title='O‘chirish'
			>
				<p>Haqiqatan ham ushbu o‘qituvchini o‘chirib tashlamoqchimisiz? 🚨</p>
			</Modal>
		</div>
	)
}

export default TeachersMore
