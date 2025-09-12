import { Input, Select } from 'antd'
import { CreateCaption } from '../../../components'
import { useEffect, useState, type FormEvent } from 'react'
import { instance } from '../../../hooks'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'
import type { RegionType } from '../../../@types/RegionTYpe'
import type { GroupsType } from '../../../@types/GroupType'

const StudentCreate = () => {
	const navigate = useNavigate()
	const { id } = useParams()
	const [loading, setLoading] = useState<boolean>(false)

	const [name, setName] = useState('')
	const [surname, setSurname] = useState('')
	const [age, setAge] = useState('')
	const [district, setDistrict] = useState('')
	const [study, setStudy] = useState('')
	const [phone, setPhone] = useState('')
	const [email, setEmail] = useState('')
	const [status, setStatus] = useState<string | undefined>()
	const [groupId, setGroupId] = useState<string | undefined>()
	const [regionId, setRegionId] = useState<string | undefined>()

	// Groups
	const [groups, setGroups] = useState<{ label: string; value: string }[]>([])
	useEffect(() => {
		instance()
			.get('/groups')
			.then(res => {
				setGroups(
					res.data.data.map((item: GroupsType) => ({
						label: item.name,
						value: item.id,
					}))
				)
			})
	}, [])

	// Regions
	const [regions, setRegions] = useState<{ label: string; value: string }[]>([])
	useEffect(() => {
		instance()
			.get('/regions')
			.then(res => {
				setRegions(
					res.data.data.map((item: RegionType) => ({
						label: item.name,
						value: item.id,
					}))
				)
			})
	}, [])

	// Student edit
	useEffect(() => {
		if (id) {
			instance()
				.get(`/students/${id}`)
				.then(res => {
					const data = res.data
					setName(data.name)
					setSurname(data.surname)
					setAge(String(data.age))
					setDistrict(data.district)
					setStudy(data.study)
					setPhone(data.phone)
					setEmail(data.email)
					setStatus(String(data.status))
					setGroupId(String(data.groupId))
					setRegionId(String(data.regionId))
				})
		}
	}, [id])

	// Submit
	function handleSubmitStudent(e: FormEvent<HTMLFormElement>) {
		e.preventDefault()
		setLoading(true)
		const data = {
			name,
			surname,
			age: Number(age),
			groupId: Number(groupId),
			regionId: Number(regionId),
			district,
			study,
			phone,
			email,
			status: status === 'true',
		}
		if (id) {
			instance()
				.patch(`/students/${id}`, data)
				.then(() => {
					toast.success('Oquvchi yangilandi!', {
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
				.post('/students', data)
				.then(() => {
					toast.success("Oquvchi qo'shildi!", {
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
			onSubmit={handleSubmitStudent}
			autoComplete='off'
			className='p-5 overflow-y-auto h-[100vh] scrollbar-none'
		>
			<div className='p-5 bg-white rounded-md'>
				<CreateCaption
					isLoading={loading}
					title={id ? 'Oquvchini' : 'Oquvchi'}
				/>
			</div>
			<div className='flex mt-5 mb-[70px] justify-between p-8 bg-white rounded-md'>
				<div className='w-[45%] flex flex-col gap-5'>
					<Input
						value={name}
						onChange={e => setName(e.target.value)}
						placeholder='Ism kiriting'
						size='large'
						allowClear
					/>
					<Input
						value={surname}
						onChange={e => setSurname(e.target.value)}
						placeholder='Familiya kiriting'
						size='large'
						allowClear
					/>
					<Input
						value={age}
						onChange={e => setAge(e.target.value)}
						placeholder='Yosh kiriting'
						size='large'
						allowClear
					/>
					<Select
						value={groupId}
						onChange={e => setGroupId(e)}
						size='large'
						allowClear
						className='!w-full'
						showSearch
						placeholder='Guruhni tanlang'
						optionFilterProp='label'
						options={groups}
					/>
					<Select
						value={regionId}
						onChange={e => setRegionId(e)}
						size='large'
						allowClear
						className='!w-full'
						showSearch
						placeholder='Viloyat tanlang'
						optionFilterProp='label'
						options={regions}
					/>
				</div>
				<div className='w-[45%] flex flex-col gap-5'>
					<Input
						value={district}
						onChange={e => setDistrict(e.target.value)}
						placeholder='Tuman kiriting'
						size='large'
						allowClear
					/>
					<Input
						value={study}
						onChange={e => setStudy(e.target.value)}
						placeholder="O'qish joyingizni kiriting"
						size='large'
						allowClear
					/>
					<Input
						value={phone}
						onChange={e => setPhone(e.target.value)}
						placeholder='Telefon raqamingizni kiriting'
						size='large'
						allowClear
					/>
					<Input
						value={email}
						onChange={e => setEmail(e.target.value)}
						placeholder='Email kiriting'
						size='large'
						allowClear
					/>
					<Select
						value={status}
						onChange={e => setStatus(e)}
						size='large'
						allowClear
						className='!w-full'
						showSearch
						placeholder='Status tanlang'
						options={[
							{ label: 'Aktiv', value: 'true' },
							{ label: 'Aktiv emas', value: 'false' },
						]}
					/>
				</div>
			</div>
		</form>
	)
}

export default StudentCreate
