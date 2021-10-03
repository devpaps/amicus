import React from 'react';
import { Link as ReachLink } from 'react-router-dom';
import {
	chakra,
	Box,
	useColorModeValue,
	Stack,
	Image,
	Link,
	Flex,
	Button,
	Text,
} from '@chakra-ui/react';

const CTA = ({ error }) => {
	return (
		<Flex
			direction={{ base: 'column', md: 'row' }}
			bg={useColorModeValue('brand.500')}
			px={8}
			py={24}
			mx='auto'
		>
			<Box
				w={{ base: 'full', md: 11 / 12, xl: 9 / 12 }}
				mx='auto'
				pr={{ md: 20 }}
			>
				<chakra.h2
					fontSize={{ base: '3xl', sm: '4xl' }}
					fontWeight='extrabold'
					lineHeight='shorter'
					color={useColorModeValue('brand.100', 'gray.100')}
					mb={6}
				>
					<chakra.span display='block'>{error}</chakra.span>
					<chakra.span
						display='block'
						color={useColorModeValue('brand.100', 'gray.500')}
					>
						Bli medlem hos oss!
					</chakra.span>
				</chakra.h2>
				<chakra.p
					mb={6}
					fontSize={{ base: 'lg', md: 'xl' }}
					color={useColorModeValue('gray.700', 'gray.300')}
				>
					Amicus är ett ställe för oss hundälskare. Här kommer du att finna
					information om hundraser, forum, intressanta artiklar om diverse
					hundar och dylikt.
				</chakra.p>
				<Stack
					direction={{ base: 'column', sm: 'row' }}
					mb={{ base: 4, md: 8 }}
					spacing={2}
				>
					<Box display='inline-flex' rounded='md' shadow='md'>
						<Link
							as={ReachLink}
							to='/signup'
							style={{ textDecoration: 'none' }}
						>
							<Button
								display='inline-flex'
								alignItems='center'
								justifyContent='center'
								variant='ghost'
								px={5}
								py={3}
								border='solid transparent'
								fontWeight='bold'
								w='full'
								rounded='md'
								color={useColorModeValue('brand.200')}
								bg='green.400'
								_hover={{
									bg: 'green.500',
								}}
							>
								Registrera dig
							</Button>
						</Link>
					</Box>
				</Stack>
			</Box>
			<Box w={{ base: 'full', md: 10 / 12 }} mx='auto' textAlign='center'>
				<Image
					w='full'
					rounded='lg'
					shadow='2xl'
					src='https://kutty.netlify.app/hero.jpg'
					alt='Hellonext feedback boards software screenshot'
				/>
			</Box>
		</Flex>
	);
};

export default CTA;
