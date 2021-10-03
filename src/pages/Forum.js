import React, { useContext } from 'react';
import { Box, Text, Center, Stack, Link } from '@chakra-ui/react';
import { Helmet } from 'react-helmet-async';
import { Link as ReachLink } from 'react-router-dom';
import InfoForum from '../components/InfoForum';
import { UserContext } from '../components/userContext';

// Custom hook from authenticate user and fetching threads
import useFetch from '../hooks/FetchThreads';

export default function Forum() {
	// Data returning from the hook
	const { forumData, loading, error } = useFetch();
	const { user } = useContext(UserContext);
	console.log(forumData);
	if (loading) {
		return <Text>{loading ? 'Hämtar trådar...' : null}</Text>;
	}

	return (
		<>
			{user ? (
				<Box>
					<Helmet>
						<meta charSet='utf-8' />
						<title>Amicus - Forum</title>
					</Helmet>
					<Center>
						<Box m={8}>
							<Text fontSize='xx-large' as='h1'>
								Välkommen till Amicus forum {user.username}!
							</Text>
							<Box mt={5}>
								<Stack direction='column' mb={3}>
									{forumData.map((thread) => (
										<Link
											to={`/thread/?threads=${thread._id}`}
											key={thread._id}
											as={ReachLink}
										>
											<Box mt={4}>
												<Text as='h1' fontWeight='bold' fontSize='xl' mb='0'>
													{thread.title}
												</Text>
												<Text as='span' fontWeight='medium' mt='0' mr='4'>
													{thread.description}
												</Text>
												<Text as='span' fontWeight='medium' color='gray.400'>
													{thread.threads.length} trådar
												</Text>
											</Box>
										</Link>
									))}
								</Stack>
							</Box>
						</Box>
					</Center>
				</Box>
			) : (
				<>
					<Helmet>
						<meta charSet='utf-8' />
						<title>Amicus - Forum</title>
					</Helmet>
					<Center>
						<Box m={8}>
							<Text fontSize='xl3' as='h1'>
								Välkommen till Amicus forum!
							</Text>
							<Box mt={5}>
								<Text fontWeight='bold'>{error}</Text>
								<InfoForum error={error} />
							</Box>
						</Box>
					</Center>
				</>
			)}
		</>
	);
}
