import { useEffect, useState, type ChangeEvent } from 'react'
import { CustomTable, PageCaption } from '../../../components'
import { instance, useDebounce } from '../../../hooks'
import { Button, Input, Select } from 'antd'
import type { GroupsType } from '../../../@types/GroupType'
import { MoreOutlined } from '@ant-design/icons'
import type { TeacherType } from '../../../@types/TeacherType'
import type { StackType } from '../../../@types/StackType'
import { useNavigate } from 'react-router-dom'

const Groups = () => {
	const navigate = useNavigate()
	const column = [
		{ title: 'ID', dataIndex: 'key' },
		{ title: 'Guruh nomi', dataIndex: 'name' },
		{ title: 'Xona', dataIndex: 'roomName' },
		{ title: "Yo'nalish", dataIndex: 'stackName' },
		{ title: 'Batafsil', dataIndex: 'action' },
	]
	const [groups, setGroups] = useState<GroupsType[]>([])
	const [teachers, setTeachers] = useState<{ label: string; value: string }[]>(
		[]
	)
	const handleMore = (id: number) => {
		navigate(`/groups/${id}`)
	}
	const [stacks, setStacks] = useState<{ label: string; value: string }[]>([])
	// Search part
	const [loading, setLoading] = useState<boolean>(true)
	const [searchName, setSearchName] = useState<string | undefined>('')
	const name = useDebounce(searchName, 1000)
	function handleSearch(e: ChangeEvent<HTMLInputElement>) {
		setSearchName(e.target.value)
		setLoading(true)
	}
	// Search part
	// Stack change
	const [stackId, setStackId] = useState<string | null>(null)
	function handleChooseStack(e: string) {
		setStackId(e)
		setLoading(true)
	}
	// Stack change
	// Teacher change
	const [mainTeacherId, setMainTeacherId] = useState<string | null>(null)
	function handleChooseTeacher(e: string) {
		setMainTeacherId(e)
		setLoading(true)
	}
	// Teacher change
	// Groups get all
	useEffect(() => {
		instance()
			.get('/groups', {
				params: {
					name,
					mainTeacherId,
					stackId,
				},
			})
			.then(res => {
				setGroups(
					res.data.data.map((item: GroupsType, index: number) => {
						item.key = index + 1
						item.roomName = item.room.name
						item.stackName = item.stack.name
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
	}, [name, mainTeacherId, stackId])
	// Stack get all
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
	// Teachers get all
	useEffect(() => {
		instance()
			.get('/teachers', {
				params: {
					statusId: 1,
					stackId,
				},
			})
			.then(res => {
				setTeachers(
					res.data.data.map((item: TeacherType) => {
						item.label = `${item.name} - ${item.surname}`
						item.value = item.id
						return item
					})
				)
			})
			.finally(() => {
				setLoading(false)
			})
	}, [stackId])
	return (
		<div className='p-5 h-[100vh] overflow-y-auto scrollbar-none flex flex-col gap-5'>
			<div className='bg-white p-5 rounded-md'>
				<PageCaption title='Guruhlar' count={groups.length} />
			</div>
			<div className='flex items-center gap-[10px] bg-white p-5 rounded-md'>
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
					onChange={handleChooseTeacher}
					size='large'
					allowClear
					className='!w-[350px]'
					showSearch
					placeholder='Ustoz tanlang'
					optionFilterProp='label'
					options={teachers}
				/>
			</div>
			<div className='mt-[10px]'>
				<CustomTable loading={loading} columns={column} data={groups} />
			</div>
		</div>
	)
}

export default Groups
