// instance.ts
import axios from 'axios'
import API from './getEnv'

const instance = () => {
	const api = axios.create({
		baseURL: API,
	})

	api.interceptors.request.use(config => {
		const token = document.cookie
			.split('; ')
			.find(row => row.startsWith('accessToken='))
			?.split('=')[1]

		if (token) {
			config.headers.Authorization = `Bearer ${token}`
		}

		return config
	})

	return api
}

export default instance
