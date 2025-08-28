import { useEffect } from 'react'
import { PATH } from '../../components'

const LoginHome = () => {
	useEffect(() => {
		location.pathname = PATH.login
	}, [])
	return ''
}

export default LoginHome
