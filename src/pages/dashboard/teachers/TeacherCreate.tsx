import { Input, Select } from 'antd'
import { CreateCaption } from '../../../components'
import { useEffect, useState, type FormEvent } from 'react'
import { instance } from '../../../hooks'
import type { StackType } from '../../../@types/StackType'
import type { RegionType } from '../../../@types/RegionTYpe'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'

const TeacherCreate = () => {
	const navigate = useNavigate()
	const { id } = useParams()
	const [loading, setLoading] = useState<boolean>(false)

	const [name, setName] = useState<string>('')
	const [surname, setSurname] = useState<string>('')
	const [age, setAge] = useState<string>('')
	const [district, setDistrict] = useState<string>('')
	const [statusId, setStatusId] = useState<string | undefined>()
	const [experience, setExperience] = useState<string | undefined>()
	const [gender, setGender] = useState<string | undefined>()
	const [email, setEmail] = useState<string | undefined>()
	const [phone, setPhone] = useState<string | undefined>()
	const [study, setStudy] = useState<string | undefined>()
	const [isMerried, setIsMerried] = useState<string | undefined>()
	const [workCompanyIds, setWorkCompanyIds] = useState<string | undefined>()
	const [stackId, setStackId] = useState<string | undefined>()
	const [regionId, setRegionId] = useState<string | undefined>()

	// Stack get all
	const [stacks, setStacks] = useState<{ label: string; value: string }[]>([])
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

	// Region get all
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

	// Work-list get all
	const [workList, setWorkList] = useState<{ label: string; value: string }[]>(
		[]
	)
	useEffect(() => {
		instance()
			.get('/work-lists')
			.then(res => {
				setWorkList(
					res.data.data.map((item: RegionType) => ({
						label: item.name,
						value: item.id,
					}))
				)
			})
	}, [])

	// Status get all
	const [status, setStatus] = useState<{ label: string; value: string }[]>([])
	useEffect(() => {
		instance()
			.get('/status')
			.then(res => {
				setStatus(
					res.data.data.map((item: RegionType) => ({
						label: item.name,
						value: item.id,
					}))
				)
			})
	}, [])

	useEffect(() => {
		if (id) {
			instance()
				.get(`/teachers/${id}`)
				.then(res => {
					const data = res.data
					setName(data.name)
					setSurname(data.surname)
					setAge(String(data.age))
					setDistrict(data.district)
					setStatusId(String(data.statusId))
					setExperience(data.experience)
					setGender(data.gender)
					setEmail(data.email)
					setPhone(data.phone)
					setStudy(data.study)
					setIsMerried(data.isMerried)
					setWorkCompanyIds(String(data.workCompanyIds?.[0]))
					setStackId(String(data.stackId))
					setRegionId(String(data.regionId))
				})
		}
	}, [id])
	function handleSubmitTeacher(e: FormEvent<HTMLFormElement>) {
		e.preventDefault()
		setLoading(true)

		if (!name || !surname || !age || !stackId || !regionId || !statusId) {
			toast.error("Iltimos, barcha majburiy maydonlarni to'ldiring")
			setLoading(false)
			return
		}

		const data = {
			name,
			surname,
			age: Number(age),
			stackId: stackId ? Number(stackId) : undefined,
			regionId: regionId ? Number(regionId) : undefined,
			district,
			statusId: statusId ? Number(statusId) : undefined,
			experience: experience || undefined,
			gender: gender || undefined,
			email: email || undefined,
			phone: phone || undefined,
			isMerried: isMerried || undefined,
			study: study || undefined,
			workCompanyIds: workCompanyIds ? [Number(workCompanyIds)] : [],
		}

		console.log(data)

		if (id) {
			instance()
				.patch(`/teachers/${id}`, data)
				.then(() => {
					toast.success('Muvaffaqiyatli yangilandi!', {
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
				.post('/teachers', data)
				.then(() => {
					toast.success("Muvaffaqiyatli qo'shildi", {
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
			onSubmit={handleSubmitTeacher}
			autoComplete='off'
			className='p-5 overflow-y-auto h-[100vh] scrollbar-none'
		>
			<div className='p-5 bg-white rounded-md'>
				<CreateCaption isLoading={loading} title={id ? 'Ustozni' : 'Ustoz'} />
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
						value={workCompanyIds}
						onChange={e => setWorkCompanyIds(e)}
						size='large'
						allowClear
						className='!w-full'
						showSearch
						placeholder='Ish joyini tanlang'
						optionFilterProp='label'
						options={workList}
					/>
					<Select
						value={stackId}
						onChange={e => setStackId(e)}
						size='large'
						allowClear
						className='!w-full'
						showSearch
						placeholder="Yo'nalish tanlang"
						optionFilterProp='label'
						options={stacks}
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
					<Input
						value={district}
						onChange={e => setDistrict(e.target.value)}
						placeholder='Tuman kiriting'
						size='large'
						allowClear
					/>
				</div>
				<div className='w-[45%] flex flex-col gap-5'>
					<Select
						value={statusId}
						onChange={e => setStatusId(e)}
						size='large'
						allowClear
						className='!w-full'
						showSearch
						placeholder='Lavozim tanlang'
						optionFilterProp='label'
						options={status}
					/>
					<Input
						value={experience}
						onChange={e => setExperience(e.target.value)}
						placeholder='Tajribangizni kiriting'
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
					<Input
						value={phone}
						onChange={e => setPhone(e.target.value)}
						placeholder='Telefon raqamingizni kiriting'
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
					<Select
						value={isMerried}
						onChange={e => setIsMerried(e)}
						size='large'
						allowClear
						className='!w-full'
						showSearch
						placeholder='Turmush qurganmisiz'
						optionFilterProp='label'
						options={[
							{ label: 'Ha', value: 'Ha' },
							{ label: "Yo'q", value: "Yo'q" },
						]}
					/>
					<Select
						value={gender}
						onChange={e => setGender(e)}
						size='large'
						allowClear
						className='!w-full'
						showSearch
						placeholder='Jins tanlang'
						optionFilterProp='label'
						options={[
							{ label: 'Erkak', value: 'Erkak' },
							{ label: 'Ayol', value: 'Ayol' },
						]}
					/>
				</div>
			</div>
		</form>
	)
}

export default TeacherCreate
