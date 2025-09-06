import React, { useState } from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Form, Input } from 'antd'
import { LogoIcon } from '../assets/icons'
import axios from 'axios'
import { API } from '../hooks'
import { useCookies } from 'react-cookie'
import { toast } from 'react-toastify'
import { PATH } from '../components'

const LoginForm: React.FC = () => {
	const [, setCookies] = useCookies(['accessToken'])
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const onFinish = (values: string) => {
		setIsLoading(true)
		axios.post(`${API}/user/login`, values).then(res => {
			toast.success('Tizimga muvaffaqiyatli kirdingiz!', {
				onClose: () => {
					setIsLoading(false)
					setCookies('accessToken', res.data.accessToken)
					location.pathname = PATH.stacks
				},
				autoClose: 1000,
			})
		})
	}

	return (
		<div className='w-[360px]'>
			<div className='flex items-center justify-center gap-[10px] mb-[20px]'>
				<LogoIcon classList='!w-[60px] !h-[60px]' />
				<span className='font-medium text-[20px]'>Admin paneli</span>
			</div>
			<Form
				autoComplete='off'
				className='!w-full'
				name='login'
				style={{ maxWidth: '100%' }}
				onFinish={onFinish}
			>
				<Form.Item
					name='username'
					rules={[{ required: true, message: 'Iltimos username kiriting!' }]}
				>
					<Input
						size='large'
						allowClear
						prefix={<UserOutlined />}
						placeholder='Kirish'
					/>
				</Form.Item>
				<Form.Item
					name='password'
					rules={[{ required: true, message: 'Iltimos parol kiriting!' }]}
				>
					<Input.Password
						size='large'
						allowClear
						prefix={<LockOutlined />}
						type='password'
						placeholder="Mahfiy so'z"
					/>
				</Form.Item>

				<Button
					loading={isLoading}
					className='!bg-[#bc8e5b]'
					size='middle'
					block
					type='primary'
					htmlType='submit'
				>
					Kirish
				</Button>
			</Form>
		</div>
	)
}

export default LoginForm
