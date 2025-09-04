import { useState, type FormEvent } from 'react'
import { CreateCaption, UploadFile } from '../../components'
import { Input } from 'antd'
import { instance } from '../../hooks'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const StacksCreate = () => {
	const [image, setImage] = useState<string>('')
	const navigate = useNavigate()
	const [name, setName] = useState<string>('')
	const [isLoading, setIsLoading] = useState<boolean>(false)
	function handleCreateStack(e: FormEvent<HTMLFormElement>) {
		setIsLoading(true)
		e.preventDefault()
		const data = { image, name }
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
	return (
		<form onSubmit={handleCreateStack} className='p-5'>
			<CreateCaption isLoading={isLoading} title="Yo'nalish" />
			<div className='mt-[30px]'>
				<UploadFile setImage={setImage} />
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
