import { Route, Routes } from 'react-router-dom'
import { PageLoading, PATH } from '../components'
import { Login, LoginHome } from '../pages'
import { Suspense } from 'react'

const LoginRoutes = () => {
	return (
		<Routes>
			<Route path={PATH.home} element={<LoginHome />} />
			<Route
				path={PATH.login}
				element={
					<Suspense fallback={<PageLoading />}>
						<Login />
					</Suspense>
				}
			/>
		</Routes>
	)
}

export default LoginRoutes
