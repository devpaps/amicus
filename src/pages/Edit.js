import React, { useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { UserContext } from '../components/userContext';
import NoAccess from './NoAccess';
import DOMPurify from 'dompurify';

export default function Edit() {
	const { search } = useLocation();
	const { user } = useContext(UserContext);
	console.log(user);

	useEffect(async () => {
		const postId = search.slice(6);
		const URL = `http://localhost:5000/api/v1/post/${postId}/editpost`;

		const options = {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			credentials: 'include',
			body: JSON.stringify({ user: user }),
		};
		const fetchData = await fetch(`${URL}`, options);
		const res = await fetchData.json();
		console.log(res);
	}, []);
	/**
	 * * const cleanInputs = DOMPurify.sanitize(x);
	 * * to clean the input when it is submitted
	 */
	return (
		<>
			{user ? (
				<>
					<h1>EDIT page</h1>
					<p>hämta data från serven om vad som skrivits här.</p>
				</>
			) : (
				<NoAccess />
			)}
		</>
	);
}
