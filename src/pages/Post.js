import React, { useState, useContext, useRef, useEffect } from 'react';
import {
	Box,
	Text,
	AvatarBadge,
	useColorModeValue,
	Avatar,
	Stack,
	Button,
	Divider,
	Flex,
	Link,
	Textarea,
	useToast,
} from '@chakra-ui/react';
import { Link as ReachLink } from 'react-router-dom';
import DOMPurify from 'dompurify';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import usePost from '../hooks/FetchPost';
import { UserContext } from '../components/userContext';
//import { addPost } from '../hooks/AddPost';

function Post() {
	const inputEl = useRef(null);
	const { user } = useContext(UserContext);
	const { post, loading } = usePost();
	const { search } = useLocation();
	const [values, setValues] = useState({ post: '' });
	const toast = useToast();
	console.log(post);
	console.log(user);

	const handleSubmit = async (e) => {
		e.preventDefault();
		//window.location.reload();
		console.log(values);

		const postId = search.slice(6);

		const URL = `http://localhost:5000/api/v1/post/${postId}/addpost`;

		const options = {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			credentials: 'include',
			body: JSON.stringify({ ...values, user: user._id }),
		};

		const fetchData = await fetch(`${URL}`, options);
		const res = await fetchData.json();
		console.log(res);
		toast({
			title: 'Meddelandet skickat!',
			status: 'success',
			duration: 3000,
			isClosable: false,
		});
		setValues({ post: '' });
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		const x = inputEl.current.value;
		const cleanInputs = DOMPurify.sanitize(x);
		//TODO: const x ska läggas in som name och value
		console.log(x);
		setValues({
			...values,
			[name]: cleanInputs,
		});
	};

	if (loading) {
		<Text>{loading ? 'Hämtar trådar...' : null}</Text>;
	}
	return (
		<Box>
			<Helmet>
				<meta charSet='utf-8' />
				<title>{`Amicus - ${post.title}`}</title>
			</Helmet>
			<Box maxW={'7xl'} padding={(0, 8)}>
				{loading ? (
					<Text>Laddar...</Text>
				) : (
					<>
						<Box
							border='1px'
							borderColor='gray.200'
							boxShadow='base'
							rounded='md'
						>
							<Box p={(6, 4)}>
								<Flex>
									<Flex direction='column' alignItems='center'>
										<Avatar>
											<AvatarBadge boxSize='1em' bg='green.500' />
										</Avatar>
										<Text fontWeight='bold' mt='3'>
											{post.user?.username}
										</Text>
									</Flex>
									<Flex direction='column' alignSelf='center' ml='5'>
										<Text as='span' fontWeight='bold' fontSize='lg'>
											{post.title}
										</Text>
										<Text as='span' fontWeight='semibold' fontSize='md'>
											{post.postdate.slice(0, 10)}
										</Text>
										<Text mt='3'>{post.content}</Text>
									</Flex>
								</Flex>
								<Divider mt={5} mb={5} />
								<form onSubmit={handleSubmit}>
									<Textarea
										name='post'
										ref={inputEl}
										onChange={handleChange}
										value={values.post}
										required={true}
										mb='3'
										placeholder={`Skriv här för att svara ${post.user?.username}...`}
									></Textarea>
									<Button
										type='button'
										bg='green.300'
										color='white'
										_hover={{
											bg: 'green.400',
										}}
										variant='outline'
										type='submit'
										size='md'
										fontWeight='medium'
										_focus={{ shadow: 'none' }}
									>
										Svara
									</Button>
								</form>
							</Box>
						</Box>
						<Flex
							m={(30, 15)}
							justifyContent='flex-end'
							color='gray.600'
							fontWeight='semibold'
						>
							{post.posts.length} Svar
						</Flex>
						<Divider />
						{post.posts.map((item) => (
							<Box
								key={item._id}
								border='1px'
								borderColor='gray.200'
								boxShadow='base'
								rounded='md'
								mt='30'
							>
								<Stack>
									//FIXME: När jag postar så det error Cannot read property
									'username' of null
									{user.username === item.user.username ? (
										<Link
											to={`/edit/?post=${item._id}`}
											key={item._id}
											as={ReachLink}
										>
											<Button
												type='button'
												bg='yellow.300'
												color='black'
												_hover={{
													bg: 'yellow.400',
												}}
												variant='outline'
												type='submit'
												size='md'
												fontWeight='medium'
												_focus={{ shadow: 'none' }}
											>
												Edit
											</Button>
										</Link>
									) : null}
									<Flex direction='column' pt='5' pb='5'>
										<Box p={(6, 4)}>
											<Flex>
												<Flex direction='column' alignItems='center'>
													<Avatar>
														<AvatarBadge boxSize='1em' bg='green.500' />
													</Avatar>
													<Text fontWeight='bold' mt='3'>
														{item.user.username}
													</Text>
												</Flex>
												<Flex direction='column' alignSelf='center' ml='5'>
													<Text as='span' fontWeight='semibold' fontSize='md'>
														{item.date.slice(0, 10)}
													</Text>
													<Text mt='3'>{item.post}</Text>
												</Flex>
											</Flex>
										</Box>
									</Flex>
								</Stack>
							</Box>
						))}
					</>
				)}
			</Box>
		</Box>
	);
}

export default Post;
