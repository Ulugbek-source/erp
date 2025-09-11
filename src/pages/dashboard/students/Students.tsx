import { Button, Input, Select } from 'antd'
import { CustomTable, PageCaption } from '../../../components'
import type { StudentType } from '../../../@types/StudentType'
import { useEffect, useState, type ChangeEvent } from 'react'
import { instance, useDebounce } from '../../../hooks'
import type { GroupsType } from '../../../@types/GroupType'
import type { RegionType } from '../../../@types/RegionTYpe'
import { MoreOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

const Students = () => {
	const navigate = useNavigate()
	const [loading, setLoading] = useState<boolean>(true)
	const [groupId, setGroupId] = useState<string | null>(null)
	const [regionId, setRegionId] = useState<string | null>(null)

	const column = [
		{ title: 'ID', dataIndex: 'key' },
		{ title: 'Ism', dataIndex: 'name' },
		{ title: 'Familiya', dataIndex: 'surname' },
		{ title: 'Guruh', dataIndex: 'groupName' },
		{ title: 'Batafsil', dataIndex: 'action' },
	]
	// Search part
	const [searchName, setSearchName] = useState<string>('')
	const name = useDebounce(searchName, 1000)

	function handleSearch(e: ChangeEvent<HTMLInputElement>) {
		setSearchName(e.target.value)
		setLoading(true)
	}
	// Search part
	const handleMore = (id: number) => {
		navigate(`/students/${id}`)
	}
	const [students, setStudents] = useState<StudentType[]>([])
	// Students get all
	useEffect(() => {
		instance()
			.get('/students', {
				params: {
					name,
					groupId,
					regionId,
				},
			})
			.then(res => {
				setStudents(
					res.data.data.map((item: StudentType, index: number) => {
						item.key = index + 1
						item.label = `${item.name} - ${item.surname}`
						item.groupName = item.group.name
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
	}, [name, groupId, regionId])
	// Students get all
	// Groups get all
	const [groups, setGroups] = useState<{ label: string; value: string }[]>([])
	useEffect(() => {
		instance()
			.get('/groups')
			.then(res => {
				setGroups(
					res.data.data.map((item: GroupsType) => {
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
	// Region get all
	const [regions, setRegions] = useState<{ label: string; value: string }[]>([])
	useEffect(() => {
		instance()
			.get('/regions')
			.then(res => {
				setRegions(
					res.data.data.map((item: RegionType) => {
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
	// Group change
	function handleChooseGroup(e: string) {
		setGroupId(e)
		setLoading(true)
	}
	// Region change
	function handleChooseRegion(e: string) {
		setRegionId(e)
		setLoading(true)
	}
	return (
		<div className='p-5 overflow-y-auto h-[100vh]'>
			<div className='bg-white p-5 rounded-md'>
				<PageCaption title="O'quvchilar" count={students.length} />
			</div>
			<div className='mt-5 flex items-center gap-5 bg-white p-5 rounded-md'>
				<Input
					onChange={handleSearch}
					className='!w-[350px]'
					placeholder='Qidirish'
					size='large'
					allowClear
				/>
				<Select
					onChange={handleChooseGroup}
					size='large'
					allowClear
					className='!w-[350px]'
					showSearch
					placeholder='Guruh tanlang'
					optionFilterProp='label'
					options={groups}
				/>
				<Select
					onChange={handleChooseRegion}
					size='large'
					allowClear
					className='!w-[350px]'
					showSearch
					placeholder='Viloyat tanlang'
					optionFilterProp='label'
					options={regions}
				/>
			</div>
			<div className='mt-5'>
				<CustomTable loading={loading} columns={column} data={students} />
			</div>
		</div>
	)
}

export default Students
