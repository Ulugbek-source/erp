import { ArrowLeftOutlined, DeleteFilled, EditFilled } from '@ant-design/icons'
import { Button, Modal } from 'antd'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { instance } from '../../../hooks'
import { toast } from 'react-toastify'
import type { StudentType } from '../../../@types/StudentType'

const StudentMore = () => {
	const { id } = useParams()
	const navigate = useNavigate()

	const [studentData, setStudentData] = useState<StudentType>()
	const [loading, setLoading] = useState<boolean>(true)

	// Delete state
	const [deleteLoading, setDeleteLoading] = useState(false)
	const [showModal, setShowModal] = useState(false)

	// Student
	useEffect(() => {
		instance()
			.get(`/students/${id}`)
			.then(res => {
				setStudentData(res.data)
			})
			.finally(() => setLoading(false))
	}, [id])

	// Delete qilish
	const handleDeleteStudent = () => {
		setDeleteLoading(true)
		instance()
			.delete(`/students/${id}`)
			.then(() => {
				toast.success('Talaba muvaffaqiyatli o‘chirildi!', {
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
						{studentData?.name} {studentData?.surname}
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
						onClick={() => navigate(`/students/${id}/update`)}
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
						<p className='text-[22px] capitalize'>
							{studentData?.name} {studentData?.surname}
						</p>
					</li>
					<li>
						<span className='text-slate-400'>Email</span>
						<p className='text-[22px]'>{studentData?.email}</p>
					</li>
					<li>
						<span className='text-slate-400'>Telefon</span>
						<p className='text-[22px]'>{studentData?.phone}</p>
					</li>
				</ul>
				<ul className='p-5 border-[2px] space-y-[20px] rounded-md border-slate-400 w-[50%]'>
					<li>
						<span className='text-slate-400'>O‘qish joyi</span>
						<p className='text-[22px] capitalize'>{studentData?.study}</p>
					</li>
					<li>
						<span className='text-slate-400'>Guruh</span>
						<p className='text-[22px]'>{studentData?.group?.name}</p>
					</li>
					<li>
						<span className='text-slate-400'>Viloyat</span>
						<p className='text-[22px]'>{studentData?.region?.name}</p>
					</li>
					<li>
						<span className='text-slate-400'>Holati</span>
						<p className='text-[22px]'>
							{studentData?.status ? 'Aktiv' : 'Aktiv emas'}
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
				onOk={handleDeleteStudent}
				title='O‘chirish'
			>
				<p>Haqiqatan ham ushbu talabani o‘chirib tashlamoqchimisiz? 🚨</p>
			</Modal>
		</div>
	)
}

export default StudentMore
