import { Input, Select } from 'antd'
import { CreateCaption } from '../../../components'
import { useEffect, useState, type FormEvent } from 'react'
import { instance } from '../../../hooks'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'
import type { StackType } from '../../../@types/StackType'
import type { RoomsType } from '../../../@types/RoomsType'
import type { TeacherType } from '../../../@types/TeacherType'

const GroupCreate = () => {
	const navigate = useNavigate()
	const { id } = useParams()
	const [loading, setLoading] = useState(false)

	const [stackId, setStackId] = useState<string | null>(null)
	const [roomId, setRoomId] = useState<string | null>(null)
	const [name, setName] = useState<string>('')
	const [teacherId, setTeacherId] = useState<string>('')
	const [supportTeacherId, setSupportTeacherId] = useState<string>('')

	useEffect(() => {
		if (id) {
			instance()
				.get(`/groups/${id}`)
				.then(res => {
					const data = res.data
					setName(data.name)
					setStackId(String(data.stackId))
					setRoomId(String(data.roomId))
					setTeacherId(String(data.mainTeacherIds?.[0] || ''))
					setSupportTeacherId(String(data.supportTeacherIds?.[0] || ''))
				})
		}
	}, [id])

	// Stacks get all
	const [stacks, setStacks] = useState<{ value: string; label: string }[]>([])
	useEffect(() => {
		instance()
			.get('/stacks')
			.then(res => {
				setStacks(
					res.data.data.map((item: StackType) => ({
						label: item.name,
						value: item.id,
					}))
				)
			})
	}, [])

	// Teachers get all
	const [teachers, setTeachers] = useState<{ label: string; value: string }[]>(
		[]
	)
	useEffect(() => {
		if (!stackId) return
		instance()
			.get('/teachers', { params: { statusId: 1, stackId } })
			.then(res => {
				setTeachers(
					res.data.data.map((item: TeacherType) => ({
						label: `${item.name} - ${item.surname}`,
						value: item.id,
					}))
				)
			})
	}, [stackId])

	// Support teachers
	const [supportTeachers, setSupportTeachers] = useState<
		{ label: string; value: string }[]
	>([])
	useEffect(() => {
		if (!stackId) return
		instance()
			.get('/teachers', { params: { statusId: 2, stackId } })
			.then(res => {
				setSupportTeachers(
					res.data.data.map((item: TeacherType) => ({
						label: `${item.name} - ${item.surname}`,
						value: item.id,
					}))
				)
			})
	}, [stackId])

	// Rooms
	const [rooms, setRooms] = useState<{ value: string; label: string }[]>([])
	useEffect(() => {
		instance()
			.get('/rooms')
			.then(res => {
				setRooms(
					res.data.data.map((item: RoomsType) => ({
						label: item.name,
						value: item.id,
					}))
				)
			})
	}, [])

	// Submit
	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault()
		setLoading(true)

		const data = {
			name,
			stackId,
			roomId,
			status: true,
			mainTeacherIds: [teacherId],
			supportTeacherIds: [supportTeacherId],
		}

		if (id) {
			instance()
				.patch(`/groups/${id}`, data)
				.then(() => {
					toast.success('Guruh yangilandi!', {
						onClose: () => {
							setLoading(false)
							navigate(-1)
						},
						autoClose: 1000,
					})
				})
				.finally(() => setLoading(false))
		} else {
			instance()
				.post('/groups', data)
				.then(() => {
					toast.success("Guruh qo'shildi!", {
						onClose: () => {
							setLoading(false)
							navigate(-1)
						},
						autoClose: 1000,
					})
				})
				.finally(() => setLoading(false))
		}
	}

	return (
		<form
			onSubmit={handleSubmit}
			autoComplete='off'
			className='p-5 overflow-y-auto h-[100vh] scrollbar-none'
		>
			<div className='p-5 bg-white rounded-md'>
				<CreateCaption title={id ? 'Guruhni' : 'Guruh'} isLoading={loading} />
			</div>
			<div className='flex justify-between mt-8 bg-white p-5 rounded-md'>
				<div className='w-[45%] flex flex-col gap-5'>
					<Select
						value={stackId}
						onChange={setStackId}
						size='large'
						allowClear
						className='!w-full'
						showSearch
						placeholder="Yo'nalish tanlang"
						optionFilterProp='label'
						options={stacks}
					/>
					<Select
						value={teacherId}
						onChange={setTeacherId}
						size='large'
						allowClear
						className='!w-full'
						showSearch
						placeholder='Ustoz tanlang'
						optionFilterProp='label'
						options={teachers}
					/>
					<Select
						value={supportTeacherId}
						onChange={setSupportTeacherId}
						size='large'
						allowClear
						className='!w-full'
						showSearch
						placeholder='Yordamchi ustoz tanlang'
						optionFilterProp='label'
						options={supportTeachers}
					/>
				</div>
				<div className='w-[45%] flex flex-col gap-5'>
					<Input
						value={name}
						onChange={e => setName(e.target.value)}
						size='large'
						allowClear
						placeholder='Guruh nomini kiriting'
					/>
					<Select
						value={roomId}
						onChange={setRoomId}
						size='large'
						allowClear
						className='!w-full'
						showSearch
						placeholder='Xona tanlang'
						optionFilterProp='label'
						options={rooms}
					/>
				</div>
			</div>
		</form>
	)
}

export default GroupCreate
