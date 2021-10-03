import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const usePosts = () => {
	const [thread, setThread] = useState([]);
	const [loading, setLoading] = useState(true);
	const { search } = useLocation();

	useEffect(() => {
		const abortController = new AbortController();
		async function getData() {
			const URL = `http://localhost:5000/api/v1/categories/${search.slice(9)}`;
			try {
				const options = {
					method: 'GET',
					credentials: 'include',
					signal: abortController.signal,
				};
				const fetchData = await fetch(`${URL}`, options);
				const res = await fetchData.json();
				setThread(res.data.categories.threads);
				setLoading(false);
			} catch (error) {
				if (error.name === 'AbortError') {
					console.log('Lämnade sidan innan data hämtades klart');
				}
				console.log(error);
			}
		}
		getData();
	}, [URL]);
	return { thread, loading };
};

export default usePosts;
