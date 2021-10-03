import { useEffect, useContext } from 'react';
import { UserContext } from '../components/userContext';

/* 
  Check if user is authenticated already, if true, then the button in the navbar changes to "Logga ut"
	Now when mounted, it checks if the user is auth. BUT, this re-renders, though only on mount.
  */

export default function useVerifyAuth() {
	const { setUser } = useContext(UserContext);
	useEffect(() => {
		const abortController = new AbortController();
		const verifyCookie = async () => {
			const URL = 'http://localhost:5000/api/v1/verifyAuth';
			try {
				const options = {
					method: 'GET',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
					},
					credentials: 'include',
					signal: abortController.signal,
				};

				const fetchData = await fetch(`${URL}`, options);
				const res = await fetchData.json();

				// Not authorized, aka cookie-less
				if (res.status === 'Failed') {
					return null;
				}
				// Authorized
				const { username, _id } = res.user;
				setUser({ username, _id });
			} catch (error) {
				if (error.name === 'AbortError') {
					console.log('Lämnade sidan innan data hämtades klart');
				}
				console.log(error);
			}
		};
		verifyCookie();
		return () => abortController.abort();
	}, [URL]);
}
