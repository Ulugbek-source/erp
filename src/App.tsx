import { useCookies } from 'react-cookie'
import { DashboardRoutes, LoginRoutes } from './routes'

const App = () => {
	const [cookies] = useCookies(['accessToken'])
	return cookies.accessToken ? <DashboardRoutes /> : <LoginRoutes />
}

export default App
