import { useEffect } from 'react'
import { PATH } from '../../components'

const DashboardHome = () => {
	useEffect(() => {
		location.pathname = PATH.groups
	}, [])
	return ''
}

export default DashboardHome
