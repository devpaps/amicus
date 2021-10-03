import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const usePost = () => {
	const [post, setPost] = useState([]);
	const [loading, setLoading] = useState(true);
	const { search } = useLocation();

	useEffect(() => {
		const abortController = new AbortController();
		const getData = async () => {
			const URL = `http://localhost:5000/api/v1/forum/${search.slice(6)}`;
			try {
				const options = {
					method: 'GET',
					signal: abortController.signal,
				};
				const fetchData = await fetch(`${URL}`, options);
				const res = await fetchData.json();
				setPost(res.data);
				setLoading(false);
			} catch (error) {
				if (error.name === 'AbortError') {
					console.log('Lämnade sidan innan data hämtades klart');
				}
				console.log(error);
			}
		};
		getData();
	}, [URL]);
	return { post, loading };
};

export default usePost;
