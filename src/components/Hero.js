import React from 'react';
import {
	chakra,
	Box,
	useColorModeValue,
	Flex,
	Text,
	Badge,
	Input,
	VisuallyHidden,
	SimpleGrid,
	Button,
	InputGroup,
	InputRightElement,
	Image,
	FormControl,
} from '@chakra-ui/react';

const KuttyHero = () => {
	return (
		<SimpleGrid
			mt='50'
			columns={{ base: 1, md: 2 }}
			spacing={0}
			_after={{
				opacity: 0.25,
				pos: 'absolute',
				top: 0,
				left: 0,
				bottom: 0,
				right: 0,
				zIndex: -1,
				content: '" "',
			}}
		>
			<Flex
				direction='column'
				alignItems='start'
				bg={useColorModeValue('red.200', 'gray.800')}
				justifyContent='center'
				px={{ base: 4, lg: 20 }}
				py={24}
			>
				<Badge
					color='white'
					px={3}
					py={1}
					mb={3}
					variant='solid'
					colorScheme='red'
					rounded='full'
				>
					Pre Beta
				</Badge>
				<Text
					as='h1'
					mb={6}
					fontSize={{ base: '3xl', md: '3xl', lg: '4xl' }}
					fontWeight='bold'
					color={useColorModeValue('brand.100', 'gray.500')}
					lineHeight='shorter'
				>
					Var med från start. Ett forum för dig och din bästa vän. 🐶
				</Text>
				<chakra.form w='full' mb={6}>
					<InputGroup size='lg' w='full' display={{ base: 'none', lg: 'flex' }}>
						<FormControl isRequired>
							<Input
								size='lg'
								type='email'
								placeholder='Ange din email...'
								bg={useColorModeValue('brand.200', 'brand.100')}
							/>
						</FormControl>
						<InputRightElement w='auto'>
							<Button
								variant='solid'
								size='lg'
								type='submit'
								roundedLeft={0}
								color={useColorModeValue('brand.200', 'brand.100')}
								bg='red.400'
								_hover={{
									bg: 'red.500',
								}}
							>
								Meddela mig
							</Button>
						</InputRightElement>
					</InputGroup>
				</chakra.form>
				<Text
					pr={{ base: 0, lg: 16 }}
					mb={4}
					fontSize='sm'
					color={useColorModeValue('brand.100', 'gray.500')}
					fontWeight='semibold'
				>
					Bli först om att veta när vi lanserar vårt forum. Där du kan diskutera
					allt mellan himmel och jord när det kommer till hundar. Vi skickar ett
					main till er så fort vi är igång.
				</Text>
			</Flex>
			<Box>
				<Image
					src='https://images.unsplash.com/photo-1531548731165-c6ae86ff6491?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80'
					alt='3 women looking at a laptop'
					fit='cover'
					w='full'
					h={{ base: 64, md: 'full' }}
					bg='gray.100'
					loading='lazy'
				/>
			</Box>
		</SimpleGrid>
	);
};

export default KuttyHero;
