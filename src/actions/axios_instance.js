import axios from 'axios';

const axiosInstance = axios.create({
	// baseURL: "https://touchline-backend.azurewebsites.net/",
	headers: {
		'Accept': 'application/json',
		'Content-Type': 'application/json',
	}
});

export default axiosInstance;