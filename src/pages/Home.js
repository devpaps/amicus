import React from 'react';
import {
	Box,
	Text,
	Image,
	Heading,
	Skeleton,
	useColorModeValue,
} from '@chakra-ui/react';
import { Helmet } from 'react-helmet-async';
import Hero from '../components/Hero';
import usePets from '../hooks/FetchPets';

const Home = () => {
	const { data, loading } = usePets();

	const messageUser = () => {
		alert('Nä nä, inte klart än. Kommer kunna klicka här senare 😉');
	};

	return (
		<>
			<Helmet>
				<meta charSet='utf-8' />
				<title>Amicus - Din hundkompis på nätet</title>
			</Helmet>
			<Box>
				<Heading
					as='h1'
					size='4xl'
					color={useColorModeValue('brand.100', 'gray.500')}
				>
					Välkommen till Amicus, din hundkompis på nätet
				</Heading>
				<Box
					mt={5}
					fontSize={['sm', 'md', 'lg', 'xl']}
					color={useColorModeValue('brand.100', 'gray.500')}
				>
					Här kommer ni att finna allt som berör hundägande och kanske rent av
					träffa likasinnande vänner?
				</Box>
				<Hero />
				<Box mt={10} mb={10}>
					<Heading
						as='h2'
						size='1xl'
						color={useColorModeValue('brand.100', 'gray.500')}
					>
						Här några av våra några av våra medlemmars hundar.
					</Heading>
				</Box>
				{loading ? (
					<Box className='grid'>
						<Box className='grid-item' mt={5} p={3}>
							<Skeleton height='326px' width='300px'></Skeleton>
						</Box>
						<Box className='grid-item' mt={5} p={3}>
							<Skeleton height='326px' width='300px'></Skeleton>
						</Box>
					</Box>
				) : (
					<Box className='grid'>
						{data.map((item) => (
							<Box
								className='grid-item'
								mt={5}
								p={3}
								border='1px'
								borderColor='gray.200'
								key={item._id}
							>
								<Image
									boxSize='300px'
									objectFit='cover'
									src={item.image_url}
									alt={item.species}
									onClick={messageUser}
								/>
								<Text fontWeight='bold'>
									Namn:{' '}
									<Text fontWeight='normal' as='span'>
										{item.name}
									</Text>
								</Text>
								<Text fontWeight='bold'>
									Ålder:{' '}
									<Text fontWeight='normal' as='span'>
										{item.pet_age}
									</Text>
								</Text>
								<Text fontWeight='bold'>
									Ras:{' '}
									<Text fontWeight='normal' as='span'>
										{item.species}
									</Text>
								</Text>
								<Text fontWeight='bold'>
									Ägarens namn:{' '}
									<Text fontWeight='normal' as='span'>
										{item.owner_name}
									</Text>
								</Text>
							</Box>
						))}
					</Box>
				)}
			</Box>
		</>
	);
};

export default Home;
