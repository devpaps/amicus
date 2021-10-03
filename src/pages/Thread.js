import React, { useRef, useState, useContext } from 'react';
import {
	Box,
	Text,
	Link,
	Container,
	Button,
	useToast,
	FormControl,
	CircularProgress,
	FormLabel,
	Input,
	useColorModeValue,
} from '@chakra-ui/react';
import { Helmet } from 'react-helmet-async';
import { Link as ReachLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import usePosts from '../hooks/FetchPosts';
import { UserContext } from '../components/userContext';

function Thread() {
	const { thread, loading } = usePosts();
	const toast = useToast();
	const { search } = useLocation();
	const { user } = useContext(UserContext);
	const inputTitle = useRef(null);
	const inputContent = useRef(null);
	const [newThread, setNewThread] = useState({ title: '', content: '' });
	const [isSubmitting, setIsSubmitting] = useState(false);
	console.log(thread);
	const addNewThread = async (e) => {
		// Get post id from url
		e.preventDefault();

		const threadId = search.slice(9);
		const URL = `http://localhost:5000/api/v1/forum/${threadId}/addthread`;

		try {
			setIsSubmitting(true);

			const options = {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				credentials: 'include',
				body: JSON.stringify({ newThread, user: user._id }),
			};

			const fetchData = await fetch(`${URL}`, options);
			const data = await fetchData.json();

			toast({
				title: 'Det lyckades!',
				description: `Ditt inlägg har postats`,
				status: 'success',
				duration: 3000,
				isClosable: false,
			});

			setIsSubmitting(false);
			setNewThread({ title: '', content: '' });
			console.log(data);
			console.log('click');
		} catch (error) {
			toast({
				title: 'Error',
				description: error.message,
				status: 'error',
				duration: 9000,
				isClosable: true,
			});
			setIsSubmitting(false);
		}
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		/* 	const updateTitle = inputTitle.current.value;
		const updateContent = inputContent.current.value; */
		console.log(name, value);
		/* console.log(title);
		console.log('updatetitle ' + updateTitle);
		console.log('updatecontent ' + updateContent); */

		setNewThread({
			...newThread,
			[name]: value,
		});
	};

	console.log(thread);
	if (loading) {
		return <Text>{loading ? 'Hämtar trådar...' : null}</Text>;
	}

	return (
		<Box>
			<Box>
				{thread.length === 0 ? (
					<Text>Ingen har skapat en tråd än 🥺</Text>
				) : null}
			</Box>
			<Box mt={10} mb={10}>
				<form onSubmit={addNewThread}>
					<FormControl id='threadTitle' isRequired>
						<FormLabel>Titel</FormLabel>
						<Input
							name='title'
							ref={inputTitle}
							onChange={handleChange}
							value={newThread.title}
							placeholder='Vad handlar din tråd om?'
						/>
					</FormControl>

					<FormControl id='threadContent' isRequired mt={4}>
						<FormLabel>Inlägget</FormLabel>
						<Input
							name='content'
							ref={inputContent}
							onChange={handleChange}
							value={newThread.content}
							placeholder='Vad vill du skriva?'
						/>
					</FormControl>

					<Button
						type='submit'
						variant='outline'
						mt={5}
						disabled={isSubmitting}
					>
						Lägg till ny post
						{isSubmitting ? (
							<CircularProgress isIndeterminate size='24px' color='green.100' />
						) : null}
					</Button>
				</form>
			</Box>
			{thread.map((item) => (
				<Box key={item._id}>
					<Helmet>
						<meta charSet='utf-8' />
						<title>{`Amicus - ${item.title}`}</title>
					</Helmet>
					<Container>
						<Box>
							<Link
								to={`/post/?post=${item._id}`}
								as={ReachLink}
								style={{ textDecoration: 'none' }}
							>
								<Box
									key={item._id}
									border='1px'
									borderColor='gray.200'
									mt='3'
									p='4'
								>
									<Text as='h1' fontSize='x-large'>
										{item.title}
									</Text>
									<Text fontWeight='medium'>{item.content}</Text>
									<Text fontWeight='medium' as='span' mr='4'>
										Skrivet av: {item.user?.username}
									</Text>
									<Text fontWeight='medium' as='span' mr='4'>
										{item.postdate.slice(0, 10)}
									</Text>
									<Text fontWeight='medium' as='span' mr='4'>
										{item.posts.length} svar
									</Text>
								</Box>
							</Link>
						</Box>
					</Container>
				</Box>
			))}
		</Box>
	);
}

export default Thread;
