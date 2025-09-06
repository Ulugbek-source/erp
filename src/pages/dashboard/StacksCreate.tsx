import { useEffect, useState, type FormEvent } from 'react'
import { CreateCaption, UploadFile } from '../../components'
import { Input } from 'antd'
import { API, instance } from '../../hooks'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'

const StacksCreate = () => {
	const { id } = useParams()
	const [image, setImage] = useState<string>('')
	const navigate = useNavigate()
	const [name, setName] = useState<string>('')
	const [isLoading, setIsLoading] = useState<boolean>(false)

	useEffect(() => {
		if (id) {
			instance()
				.get(`/stacks/${id}`)
				.then(res => {
					setName(res.data.name)
					setImage(`${API}/file/${res.data.image}`)
				})
		}
	}, [])
	function handleCreateStack(e: FormEvent<HTMLFormElement>) {
		setIsLoading(true)
		e.preventDefault()
		const data = { image, name }
		if (id) {
			if (data.image.includes('http')) {
				data.image = data.image.split(`${API}/file/`)[1]
			}
			instance()
				.patch(`/stacks/${id}`, data)
				.then(() => {
					toast.success("Muvaffaqiyatli o'zgartirildi!", {
						onClose: () => {
							setIsLoading(false)
							navigate(-1)
						},
						autoClose: 1000,
					})
				})
		} else {
			instance()
				.post('/stacks', data)
				.then(() => {
					toast.success('Muvaffaqiyatli saqlandi!', {
						onClose: () => {
							setIsLoading(false)
							navigate(-1)
						},
						autoClose: 1000,
					})
				})
		}
	}
	return (
		<form onSubmit={handleCreateStack} className='p-5'>
			<CreateCaption isLoading={isLoading} title="Yo'nalish" />
			<div className='mt-[30px]'>
				<UploadFile image={image} setImage={setImage} />
				<Input
					value={name}
					onChange={e => setName(e.target.value)}
					className='!mt-[20px] !w-[400px]'
					size='large'
					placeholder="Yo'nalish nomini kiriting"
				/>
			</div>
		</form>
	)
}

export default StacksCreate
