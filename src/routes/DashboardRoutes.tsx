import { Route, Routes } from 'react-router-dom'
import { PATH } from '../components'
import {
	DashboardHome,
	GroupCreate,
	GroupMore,
	Groups,
	StackMore,
	Stacks,
	StacksCreate,
	Students,
	StudentsCreate,
	StudentsMore,
	TeacherCreate,
	Teachers,
	TeachersMore,
} from '../pages'
import { Header, Navbar } from '../modules'
import { useState } from 'react'

const DashboardRoutes = () => {
	const [collapse, setCollapse] = useState<boolean>(false)
	const routeList = [
		{ id: 1, path: PATH.stacks, element: <Stacks /> },
		{ id: 2, path: PATH.groups, element: <Groups /> },
		{ id: 3, path: PATH.teachers, element: <Teachers /> },
		{ id: 3, path: PATH.students, element: <Students /> },
		{ id: 5, path: PATH.home, element: <DashboardHome /> },
		{ id: 6, path: PATH.stacksCreate, element: <StacksCreate /> },
		{ id: 7, path: PATH.stacksUpdate, element: <StacksCreate /> },
		{ id: 8, path: PATH.stacksMore, element: <StackMore /> },
		{ id: 9, path: PATH.groupsCreate, element: <GroupCreate /> },
		{ id: 10, path: PATH.teachersCreate, element: <TeacherCreate /> },
		{ id: 11, path: PATH.teachersUpdate, element: <TeacherCreate /> },
		{ id: 12, path: PATH.teachersMore, element: <TeachersMore /> },
		{ id: 13, path: PATH.studentsCreate, element: <StudentsCreate /> },
		{ id: 14, path: PATH.studentsUpdate, element: <StudentsCreate /> },
		{ id: 15, path: PATH.studentsMore, element: <StudentsMore /> },
		{ id: 16, path: PATH.groupsMore, element: <GroupMore /> },
	]
	return (
		<div className='flex'>
			<Navbar collapse={collapse} />
			<div className={`${collapse ? 'w-full' : 'w-[82%]'}`}>
				<Header setCollapse={setCollapse} collapse={collapse} />
				<Routes>
					{routeList.map(item => (
						<Route key={item.id} path={item.path} element={item.element} />
					))}
				</Routes>
			</div>
		</div>
	)
}

export default DashboardRoutes
