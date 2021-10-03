import { useState, useEffect } from 'react';

const useFetch = () => {
	const [forumData, setForumData] = useState([]);

	const [error, setError] = useState();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const abortController = new AbortController();
		async function getForum() {
			const URL = 'http://localhost:5000/api/v1/categories';
			try {
				const options = {
					signal: abortController.signal,
				};

				const fetchData = await fetch(`${URL}`, options);
				const res = await fetchData.json();

				setForumData(res.data.categories);
				setLoading(false);
			} catch (error) {
				if (error.name === 'AbortError') {
					console.log('Lämnade sidan innan data hämtades klart');
				}
				console.log(error);
			}
		}
		getForum();
	}, [URL]);
	return { forumData, error, loading };
};

export default useFetch;
