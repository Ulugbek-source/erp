import { Button, Input, Select } from 'antd'
import { CustomTable, PageCaption } from '../../../components'
import { useEffect, useState, type ChangeEvent } from 'react'
import { instance, useDebounce } from '../../../hooks'
import type { TeacherType } from '../../../@types/TeacherType'
import { MoreOutlined } from '@ant-design/icons'
import type { StackType } from '../../../@types/StackType'
import type { RegionType } from '../../../@types/RegionTYpe'
import { useNavigate } from 'react-router-dom'

const Teachers = () => {
	const navigate = useNavigate()
	const [loading, setLoading] = useState<boolean>(true)
	const [teachers, setTeachers] = useState<TeacherType[]>([])

	const handleMore = (id: string) => {
		navigate(`/teachers/${id}`)
	}

	// Search part
	const [searchName, setSearchName] = useState<string>('')
	const name = useDebounce(searchName, 1000)

	function handleSearch(e: ChangeEvent<HTMLInputElement>) {
		setSearchName(e.target.value)
		setLoading(true)
	}
	// Search part
	const column = [
		{ title: 'ID', dataIndex: 'key' },
		{ title: 'Ismi', dataIndex: 'name' },
		{ title: 'Familiya', dataIndex: 'surname' },
		{ title: "Yo'nalish", dataIndex: 'stackName' },
		{ title: 'Lavozim', dataIndex: 'statusName' },
		{ title: 'Batafsil', dataIndex: 'action' },
	]

	// Stack change
	const [stackId, setStackId] = useState<string | null>(null)
	function handleChooseStack(e: string) {
		setStackId(e)
		setLoading(true)
	}
	// Status change
	const [statusId, setStatusId] = useState<string | null>(null)
	function handleChooseStatus(e: string) {
		setStatusId(e)
		setLoading(true)
	}
	// Teachers  get all
	useEffect(() => {
		instance()
			.get('/teachers', {
				params: {
					name,
					stackId,
					statusId,
				},
			})
			.then(res => {
				setTeachers(
					res.data.data.map((item: TeacherType, index: number) => {
						item.key = index + 1
						item.stackName = item.stack.name
						item.statusName = item.status.name
						item.action = (
							<Button
								onClick={() => handleMore(item.id)}
								size='large'
								icon={<MoreOutlined />}
								type='text'
							></Button>
						)
						return item
					})
				)
			})
			.finally(() => {
				setLoading(false)
			})
	}, [name, stackId, statusId])
	// Teachers get all
	// Stack get all
	const [stacks, setStacks] = useState<{ label: string; value: string }[]>([])
	useEffect(() => {
		instance()
			.get('/stacks')
			.then(res => {
				setStacks(
					res.data.data.map((item: StackType) => {
						item.label = item.name
						item.value = item.id
						return item
					})
				)
			})
			.finally(() => {
				setLoading(false)
			})
	}, [])
	// Status get all
	const [status, setStatus] = useState<{ label: string; value: string }[]>([])
	useEffect(() => {
		instance()
			.get('/status')
			.then(res => {
				setStatus(
					res.data.data.map((item: RegionType) => {
						item.label = item.name
						item.value = item.id
						return item
					})
				)
			})
	}, [])
	// Status get all
	return (
		<div className='p-5 h-[100vh] overflow-y-auto scrollbar-none rounded-md'>
			<div className='bg-white p-5 rounded-md'>
				<PageCaption title='Ustozlar' count={teachers.length} />
			</div>
			<div className='mt-5 flex items-center gap-5 bg-white p-5'>
				<Input
					onChange={handleSearch}
					className='!w-[350px]'
					placeholder='Qidirish'
					size='large'
					allowClear
				/>
				<Select
					onChange={handleChooseStack}
					size='large'
					allowClear
					className='!w-[350px]'
					showSearch
					placeholder="Yo'nalish tanlang"
					optionFilterProp='label'
					options={stacks}
				/>
				<Select
					onChange={handleChooseStatus}
					size='large'
					allowClear
					className='!w-[350px]'
					showSearch
					placeholder='Lavozim tanlang'
					optionFilterProp='label'
					options={status}
				/>
			</div>
			<div className='mt-5'>
				<CustomTable loading={loading} columns={column} data={teachers} />
			</div>
		</div>
	)
}

export default Teachers
