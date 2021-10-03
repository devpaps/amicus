import React, { useContext, useState, useRef, useEffect } from 'react';
import { Link as ReachLink } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../components/userContext';
import { Helmet } from 'react-helmet-async';
import NoAccess from './NoAccess';
import ErrorMessage from '../components/ErrorMessage';
import { useParams } from 'react-router-dom';
import {
	Button,
	useColorMode,
	SimpleGrid,
	Text,
	Link,
	Box,
	Flex,
	FormLabel,
	Input,
	FormControl,
	CircularProgress,
	Spacer,
	Stack,
	Heading,
	IconButton,
} from '@chakra-ui/react';

export default function Profile() {
	const inputEl = useRef(null);
	const passwordEl = useRef(null);
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const { user } = useContext(UserContext);
	const [values, setValues] = useState({ user: '' });
	const [member, setMember] = useState([]);
	const { id } = useParams();

	//!TODO Use useRef hook to Not update page refresh when the user types in the input fields
	//!TODO Add all fields to the form, username, email, password?, confirm password?, and profile picture
	//!TODO Add a button to upload a profile picture

	useEffect(() => {
		async function getUser() {
			try {
				const URL = `http://localhost:5000/api/v1/user/profile/${id}`;
				const res = await fetch(`${URL}`);

				const done = await res.json();
				setMember(done.data.user);
				console.log(done.data.user);
				/* const settings = {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			credentials: 'include',
			body: JSON.stringify(values),
		}; */

				//!TODO - add correct address to server to store userdata
				/* const response = await fetch('http://localhost:5000/api/user/update', settings);
		const data = await response.json();
		if (data.error) {
			setError(data.error);
			setIsLoading(false);
		} else {
			setUser(data);
			setIsLoading(false);
			history.push('/');
		}
	} catch (err) {
		console.log(err);
		setError('Something went wrong');
		setIsLoading(false);
	} */

				// Wrong username or password
				if (done.status === 'Failed') {
					setIsLoading(false);
					return setError(done.message);
				}

				setIsLoading(false);
			} catch (error) {
				setIsLoading(false);
				console.log(error);
			}
		}
		getUser();
	}, []);

	function handleChange(e) {
		const { realName, password } = e.target;
		const x = inputEl.current.value;
		const y = passwordEl.current.value;
		console.log(x);
		console.log(y);

		setValues({
			...values,
			[realName]: x,
			[password]: y,
		});
	}

	async function handleSubmit(e) {
		e.preventDefault();
		setIsLoading(true);
	}

	return (
		<>
			<Helmet>
				<meta charSet='utf-8' />
				<title>Amicus - Din hundkompis på nätet</title>
			</Helmet>
			{user ? (
				<Box>
					<Heading as='h1' size='lg'>
						Profil för {user?.username}
					</Heading>
					{/* Checks if the right user is logged in according to the id in the url */}
					{user._id === member?._id ? (
						member.fullName
					) : (
						<Text>Fel användare inloggad</Text>
					)}
					<Box maxW='sm' borderWidth='1px' rounded='lg' p={4} my={4}>
						<>
							<form onSubmit={handleSubmit}>
								{error && <ErrorMessage message={error} />}
								<SimpleGrid columns={[2, null, 2]} spacing={10}>
									<FormControl>
										<FormLabel htmlFor='realName'>Namn</FormLabel>
										<Input
											name='realName'
											placeholder='Namn'
											value={values.realName}
											onChange={handleChange}
											autoComplete='off'
											ref={inputEl}
										/>
									</FormControl>

									<FormControl>
										<FormLabel htmlFor='lastName'>Efternamn</FormLabel>
										<Input
											name='lastName'
											type='text'
											placeholder='Lösenord'
											value={values.password}
											onChange={handleChange}
											ref={passwordEl}
										/>
									</FormControl>
									<FormControl>
										<FormLabel htmlFor='userName'>Användarnamn</FormLabel>
										<Input
											name='userName'
											placeholder='Användarnamn'
											value={values.userName}
											onChange={handleChange}
											autoComplete='off'
											ref={inputEl}
										/>
									</FormControl>

									<FormControl>
										<FormLabel htmlFor='password'>Lösenord</FormLabel>
										<Input
											name='password'
											type='password'
											placeholder='Lösenord'
											value={values.password}
											onChange={handleChange}
											ref={passwordEl}
										/>
									</FormControl>
								</SimpleGrid>

								<Button
									mt={4}
									color='white'
									variant='outline'
									type='submit'
									width='full'
									loadingText='Submitting'
									bg='green.400'
									_hover={{
										bg: 'green.500',
									}}
									disabled={isLoading}
								>
									{isLoading ? (
										<CircularProgress
											isIndeterminate
											size='24px'
											color='teal'
										/>
									) : (
										'Spara'
									)}
								</Button>
							</form>
						</>
					</Box>
				</Box>
			) : (
				<NoAccess />
			)}
		</>
	);
}
