import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ErrorMessage from '../components/ErrorMessage';
import {
	Box,
	Button,
	Stack,
	Text,
	FormLabel,
	Input,
	FormControl,
	CircularProgress,
	useToast,
} from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../components/userContext';
import DOMPurify from 'dompurify';

const Login = () => {
	const history = useHistory();
	const toast = useToast();
	const { setUser } = useContext(UserContext);

	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');
	const [values, setValues] = useState({
		username: '',
		password: '',
	});

	function handleChange(e) {
		const { name, value } = e.target;
		const cleanInputs = DOMPurify.sanitize(value);

		setValues({
			...values,
			[name]: cleanInputs,
		});
	}

	async function handleSubmit(e) {
		e.preventDefault();
		setIsLoading(true);
		try {
			const settings = {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				credentials: 'include',
				body: JSON.stringify(values),
			};

			const res = await fetch(
				'http://localhost:5000/api/v1/user/login',
				settings
			);

			const done = await res.json();

			// Wrong username or password
			if (done.status === 'Failed') {
				setIsLoading(false);
				return setError(done.message);
			}
			const { username, _id } = done.user;
			// Show toast when success
			toast({
				title: 'Inloggningen lyckades!',
				description: `Hoppas du trivs ${username}`,
				status: 'success',
				duration: 3000,
				isClosable: false,
			});

			setIsLoading(false);
			setUser({ username, _id });
			history.push('/', { from: 'Login' });
		} catch (error) {
			toast({
				title: 'Inloggningen misslyckades!',
				status: 'error',
				duration: 3000,
				isClosable: false,
			});
			setIsLoading(false);
			console.log(error);
		}
	}

	return (
		<>
			<Helmet>
				<meta charSet='utf-8' />
				<title>Amicus - Logga in</title>
			</Helmet>
			<Box m={8}>
				<Text as='h1' fontSize='4xl'>
					Logga in
				</Text>
				<Box maxW='sm' borderWidth='1px' rounded='lg' p={4} my={4}>
					<Stack spacing={4}>
						<form onSubmit={handleSubmit}>
							{error && <ErrorMessage message={error} />}
							<FormControl isRequired>
								<FormLabel htmlFor='username'>Användarnamn</FormLabel>
								<Input
									name='username'
									placeholder='Användarnamn'
									value={values.username}
									onChange={handleChange}
								/>
							</FormControl>

							<FormControl isRequired mt='4'>
								<FormLabel htmlFor='password'>Lösenord</FormLabel>
								<Input
									name='password'
									type='password'
									placeholder='Lösenord'
									value={values.password}
									onChange={handleChange}
								/>
							</FormControl>

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
									<CircularProgress isIndeterminate size='24px' color='teal' />
								) : (
									'Logga in'
								)}
							</Button>
						</form>
					</Stack>
				</Box>
				<Text fontWeight='bold'>
					<Link to='/signup'>Registrera dig här</Link>
				</Text>
			</Box>
		</>
	);
};

export default Login;
