import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import ErrorMessage from '../components/ErrorMessage';
import { Link as ReachLink } from 'react-router-dom';
import {
	Box,
	Button,
	Stack,
	Text,
	Link,
	FormLabel,
	Input,
	FormControl,
	CircularProgress,
	useColorModeValue,
} from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';

const Register = () => {
	const history = useHistory();

	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');
	const [values, setValues] = useState({
		username: '',
		password: '',
		fullName: '',
		email: '',
	});

	function handleChange(e) {
		const { name, value } = e.target;
		setValues({
			...values,
			[name]: value,
		});
	}

	async function handleSubmit(e) {
		e.preventDefault();
		console.log(values);
		try {
			const settings = {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(values),
			};

			const res = await fetch(
				'http://localhost:5000/api/v1/user/signup',
				settings
			);
			const done = await res.json();
			console.log(done);
			if (done.status === 'Failed') {
				setIsLoading(false);
				return setError(done.message.errors.username);
			}
			alert('Grattis, du kan nu logga in!');
			history.push('/login');
		} catch (error) {
			console.log(error.message);
		}
	}

	return (
		<>
			<Helmet>
				<meta charSet='utf-8' />
				<title>Amicus - Registrera dig</title>
			</Helmet>
			<Box m={8}>
				<Text as='h1' fontSize='4xl'>
					Registrera dig
				</Text>
				<Box maxW='sm' borderWidth='1px' rounded='lg' p={4} my={4}>
					<Stack spacing={4}>
						<form onSubmit={handleSubmit}>
							{error && <ErrorMessage message={error.message} />}
							<FormControl isRequired>
								<FormLabel htmlFor='fullName'>Namn</FormLabel>
								<Input
									name='fullName'
									placeholder='Namn'
									value={values.name}
									onChange={handleChange}
								/>
							</FormControl>

							<FormControl isRequired>
								<FormLabel htmlFor='email'>Email</FormLabel>
								<Input
									name='email'
									placeholder='Email'
									value={values.name}
									onChange={handleChange}
								/>
							</FormControl>

							<FormControl isRequired>
								<FormLabel htmlFor='username'>Användarnamn</FormLabel>
								<Input
									name='username'
									placeholder='Användarnamn'
									value={values.name}
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
							>
								{isLoading ? (
									<CircularProgress isIndeterminate size='24px' color='teal' />
								) : (
									'Registrera'
								)}
							</Button>
						</form>
					</Stack>
					<Box pt='3'>
						<Text>
							Är du redan medlem?{' '}
							<Link as={ReachLink} to='/login'>
								<Text as='b'>Logga in</Text>
							</Link>
						</Text>
					</Box>
				</Box>
			</Box>
		</>
	);
};

export default Register;
