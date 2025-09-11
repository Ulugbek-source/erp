import { lazy } from 'react'
import LoginHome from './auth/LoginHome'
import DashboardHome from './dashboard/DashboardHome'
import Groups from './dashboard/groups/Groups'
import GroupCreate from './dashboard/groups/GroupCreate'
import GroupMore from './dashboard/groups/GroupMore'
import Stacks from './dashboard/stacks/Stacks'
import StacksCreate from './dashboard/stacks/StacksCreate'
import StackMore from './dashboard/stacks/StackMore'
import Teachers from './dashboard/teachers/Teachers'
import TeacherCreate from './dashboard/teachers/TeacherCreate'
import TeachersMore from './dashboard/teachers/TeachersMore'
import Students from './dashboard/students/Students'
import StudentsCreate from './dashboard/students/StudentsCreate'
import StudentsMore from './dashboard/students/StudentsMore'

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
	GroupCreate,
	GroupMore,
	Stacks,
	Teachers,
	TeacherCreate,
	TeachersMore,
	Students,
	StudentsCreate,
	StudentsMore,
	StacksCreate,
	StackMore,
}
