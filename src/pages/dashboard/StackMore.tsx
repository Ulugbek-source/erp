import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { API, instance } from '../../hooks'
import type { StackType } from '../../@types/StackType'
import {
	ArrowLeftOutlined,
	DeleteFilled,
	EditFilled,
	MoreOutlined,
} from '@ant-design/icons'
import { Button, Modal } from 'antd'
import { toast } from 'react-toastify'
import { CustomTable } from '../../components'
import type { GroupsType } from '../../@types/GroupType'

const StackMore = () => {
	const { id } = useParams()
	const navigate = useNavigate()
	const [stackData, setStackData] = useState<StackType>()
	useEffect(() => {
		instance()
			.get(`/stacks/${id}`)
			.then(res => {
				setStackData(res.data)
			})
	}, [id])
	//
	const [groupsLoading, setGroupsLoading] = useState<boolean>(true)
	const [stackGroups, setStackGroups] = useState([])
	const column = [
		{ title: 'ID', dataIndex: 'key' },
		{ title: 'Guruh nomi', dataIndex: 'name' },
		{ title: 'Xona', dataIndex: 'roomName' },
		{ title: "Yo'nalish", dataIndex: 'stackName' },
		{ title: 'Batafsil', dataIndex: 'action' },
	]
	useEffect(() => {
		instance()
			.get('/groups', {
				params: {
					stackId: id,
				},
			})
			.then(res => {
				setStackGroups(
					res.data.data.map((item: GroupsType, index: number) => {
						item.key = index + 1
						item.roomName = item.room.name
						item.stackName = item.stack.name
						item.action = (
							<Button size='large' icon={<MoreOutlined />} type='text'></Button>
						)
						return item
					})
				)
				setGroupsLoading(false)
			})
	}, [id])
	// Delete part
	const [deleteId, setDeleteId] = useState<string | null | undefined>(null)
	const [deleteLoading, setDeleteLoading] = useState<boolean>(false)
	const [showModal, setShowModal] = useState(false)
	function handleDelete() {
		setShowModal(true)
		setDeleteId(id)
	}
	function handleDeleteStack() {
		setDeleteLoading(true)
		instance()
			.delete(`/stacks/${deleteId}`)
			.then(() => {
				toast.success("O'chirildi!", {
					onClose: () => {
						setDeleteLoading(false)
						setShowModal(false)
						navigate(-1)
					},
					autoClose: 1000,
				})
			})
			.catch(() => {
				toast.error('Bu stackda guruh mavjud!', {
					onClose: () => {
						setDeleteLoading(false)
						setShowModal(false)
					},
					autoClose: 1000,
				})
			})
	}
	// Delete part
	return (
		<div className='p-5 h-[100vh] overflow-y-auto scrollbar-none'>
			<div className='flex items-center justify-between'>
				<div className='flex items-center gap-[15px]'>
					<button onClick={() => navigate(-1)}>
						<ArrowLeftOutlined className='!text-[20px] cursor-pointer hover:scale-[1.1] duration-300' />
					</button>
					<h2 className='font-semibold text-[22px]'>{stackData?.name}</h2>
				</div>
				<div className='flex items-center gap-[15px]'>
					<Button
						onClick={() => handleDelete()}
						className='!bg-red-500'
						size='large'
						type='primary'
						icon={<DeleteFilled />}
					></Button>
					<Button
						onClick={() => navigate('update')}
						className='!bg-green-500'
						size='large'
						type='primary'
						icon={<EditFilled />}
					></Button>
				</div>
			</div>
			<div className='mt-[30px] flex gap-10'>
				<ul className='p-5 border-[2px] space-y-[20px] rounded-md border-slate-400 w-[50%]'>
					<li>
						<span className='text-slate-400'>#</span>
						<p className='text-[22px]'>{id}</p>
					</li>
					<li>
						<span className='text-slate-400'>Yo'nalish nomi</span>
						<p className='text-[22px]'>{stackData?.name}</p>
					</li>
					<li>
						<span className='text-slate-400'>Yaratilgan sanasi</span>
						<p className='text-[22px]'>
							{stackData?.createdAt?.split('T')[0]} &&
							{stackData?.createdAt?.split('T')[1].split('.')[0]}
						</p>
					</li>
				</ul>
				<img
					className='object-cover rounded-md'
					src={`${API}/file/${stackData?.image}`}
					alt='Stack image'
					width={400}
				/>
			</div>
			<div className='mt-[30px]'>
				<CustomTable
					loading={groupsLoading}
					columns={column}
					data={stackGroups}
				/>
			</div>

			<Modal
				cancelText='Yo‘q'
				okText='Ha, o‘chir'
				okButtonProps={{ type: 'primary', className: '!bg-[#bc8e5b]' }}
				confirmLoading={deleteLoading}
				open={showModal}
				onCancel={() => setShowModal(false)}
				onOk={handleDeleteStack}
				title={'O‘chirish tasdiqlansin!'}
			>
				<p>Haqiqatan ham ushbu stackni o‘chirib tashlamoqchimisiz? 🚨</p>
			</Modal>
		</div>
	)
}

export default StackMore
