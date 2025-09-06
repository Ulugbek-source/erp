import React, {
	useEffect,
	useState,
	type Dispatch,
	type SetStateAction,
} from 'react'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { Flex, message, Upload } from 'antd'
import type { GetProp, UploadProps } from 'antd'
import { API } from '../hooks'

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]

const getBase64 = (img: FileType, callback: (url: string) => void) => {
	const reader = new FileReader()
	reader.addEventListener('load', () => callback(reader.result as string))
	reader.readAsDataURL(img)
}

const beforeUpload = (file: FileType) => {
	const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
	if (!isJpgOrPng) {
		message.error('You can only upload JPG/PNG file!')
	}
	const isLt2M = file.size / 1024 / 1024 < 2
	if (!isLt2M) {
		message.error('Image must smaller than 2MB!')
	}
	return isJpgOrPng && isLt2M
}

const UploadFile: React.FC<{
	image: string
	setImage: Dispatch<SetStateAction<string>>
}> = ({ image, setImage }) => {
	const [loading, setLoading] = useState(false)
	const [imageUrl, setImageUrl] = useState<string>()

	const handleChange: UploadProps['onChange'] = info => {
		if (info.file.status === 'uploading') {
			setLoading(true)
			return
		}
		if (info.file.status === 'done') {
			getBase64(info.file.originFileObj as FileType, url => {
				setLoading(false)
				setImageUrl(url)
			})
			setImage(info.file.response.filename)
		}
	}

	const uploadButton = (
		<button style={{ border: 0, background: 'none' }} type='button'>
			{loading ? <LoadingOutlined /> : <PlusOutlined />}
			<div style={{ marginTop: 8 }}>Upload</div>
		</button>
	)

	useEffect(() => {
		if (image) {
			setImageUrl(image)
		}
	}, [image])
	return (
		<Flex gap='middle' wrap>
			<Upload
				name='file'
				listType='picture-card'
				className='avatar-uploader'
				showUploadList={false}
				action={`${API}/file`}
				beforeUpload={beforeUpload}
				onChange={handleChange}
			>
				{imageUrl ? (
					<img
						className='!w-full !h-[240px] object-cover rounded-md'
						src={imageUrl}
						alt='avatar'
						style={{ width: '100%' }}
					/>
				) : (
					uploadButton
				)}
			</Upload>
		</Flex>
	)
}

export default UploadFile
