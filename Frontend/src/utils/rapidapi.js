import axios from 'axios';

const API_KEY=import.meta.env.VITE_VIDEOTUBE_API_KEY;

const BASE_URL = 'https://youtube138.p.rapidapi.com';

const options = {
	method: 'GET',
	hostname: 'youtube138.p.rapidapi.com',
	headers: {
		'x-rapidapi-key': 'API_KEY',
		'x-rapidapi-host': 'youtube138.p.rapidapi.com'
	}
};

export const fetchData = async (url) => {
	try {
		const {data}=await axios.get(`${BASE_URL}${url}`, options);
		return data;
	}
	catch (error) {
		console.error(error);
		throw error;
	}
}