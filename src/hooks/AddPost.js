import { useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

export function AddPostToforum({ values }) {
	const { search } = useLocation();
	const history = useHistory();
	console.log(values);

	const postId = search.slice(9);
	const URL = `http://localhost:5000/api/v1/post/${postId}/addpost`;
	console.log(search.slice(9));

	useEffect(() => {
		const postData = async () => {
			const options = {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				credentials: 'include',
				body: JSON.stringify(values),
			};

			const fetchData = await fetch(`${URL}`, options);
			const res = await fetchData.json();

			if (res.status === 'Failed') {
				setIsLoading(false);
				return setError(done.message);
			}

			toast({
				title: 'Meddelandet skickat!',
				status: 'success',
				duration: 3000,
				isClosable: false,
			});

			history.push('/');
		};
		postData();
	}, [URL]);
}
AddPostToforum.PropTypes = {
	values: PropTypes.object,
};
