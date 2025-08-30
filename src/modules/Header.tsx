import {
	BellOutlined,
	LoginOutlined,
	MenuFoldOutlined,
	MenuUnfoldOutlined,
} from '@ant-design/icons'
import { Badge, Button, Modal } from 'antd'
import { useState, type Dispatch, type FC, type SetStateAction } from 'react'
import { useCookies } from 'react-cookie'
import { toast } from 'react-toastify'

const Header: FC<{
	collapse: boolean
	setCollapse: Dispatch<SetStateAction<boolean>>
}> = ({ collapse, setCollapse }) => {
	const [, , removeCookies] = useCookies(['accessToken'])
	const [showModal, setShowModal] = useState<boolean>(false)
	const [loading, setLoading] = useState<boolean>(false)

	function handleLogout() {
		setLoading(true)
		toast.success('Tizimga muvaffaqiyatli chiqdingiz!', {
			onClose: () => {
				setLoading(false)
				setShowModal(false)
				removeCookies('accessToken')
				location.pathname = '/'
			},
			autoClose: 1000,
		})
	}
	return (
		<div className='flex p-[15px] items-center justify-between bg-[#001529]'>
			<button
				onClick={() => setCollapse(!collapse)}
				className='text-white cursor-pointer'
			>
				{collapse ? (
					<MenuUnfoldOutlined className='!text-[25px]' />
				) : (
					<MenuFoldOutlined className='!text-[25px]' />
				)}
			</button>
			<div className='flex items-center gap-[10px]'>
				<Badge size='default' overflowCount={9} count={10}>
					<Button
						size='large'
						icon={<BellOutlined className='!text-[22px]' />}
					></Button>
				</Badge>
				<Button
					onClick={() => setShowModal(true)}
					className='!text-white hover:scale-[1.1] duration-300'
					icon={<LoginOutlined />}
					size='large'
					type='text'
					iconPosition='end'
				>
					Chiqish
				</Button>
			</div>
			<Modal
				cancelText='Bekor qilish'
				okText='Chiqish'
				okButtonProps={{ type: 'primary', className: '!bg-[#bc8e5b]' }}
				confirmLoading={loading}
				open={showModal}
				onCancel={() => setShowModal(false)}
				onOk={handleLogout}
				title={'Tizimdan chiqish!'}
			>
				<p>Tizimdan chiqib ketyabsiz 👾</p>
			</Modal>
		</div>
	)
}

export default Header
