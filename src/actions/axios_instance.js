import axios from 'axios';

const axiosInstance = axios.create({
	baseURL: process.env.REACT_APP_BACKEND_URL,
	headers: {
		'Accept': 'application/json',
		'Content-Type': 'application/json',
	}
});

export default axiosInstance;