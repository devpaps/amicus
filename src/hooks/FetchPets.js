import { useState, useEffect } from 'react';

const usePets = () => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function getForum() {
			const URL = 'http://localhost:5000/api/v1/pets';
			const abortController = new AbortController();
			try {
				const fetchData = await fetch(`${URL}`, {
					signal: abortController.signal,
				});
				const res = await fetchData.json();

				setData(res.data.pets);
				setLoading(false);
			} catch (error) {
				if (error.name === 'AbortError') {
					console.log('Lämnade sidan innan data hämtades klart.');
				}
				console.log(error);
			}
		}
		getForum();
	}, [URL]);
	return { data, loading };
};

export default usePets;
