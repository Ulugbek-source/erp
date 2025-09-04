import { lazy } from 'react'
import LoginHome from './auth/LoginHome'
import DashboardHome from './dashboard/DashboardHome'
import Groups from './dashboard/Groups'
import Stacks from './dashboard/Stacks'
import StacksCreate from './dashboard/StacksCreate'
import Teachers from './dashboard/Teachers'
import Students from './dashboard/Students'

const Login = lazy(
	() =>
		new Promise<{ default: React.ComponentType }>(resolve => {
			setTimeout(async () => {
				const module = await import('./auth/Login')
				resolve({ default: module.default })
			}, 2000)
		})
)

export {
	Login,
	LoginHome,
	DashboardHome,
	Groups,
	Stacks,
	Teachers,
	Students,
	StacksCreate,
}
