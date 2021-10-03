import React, { useContext, useState } from 'react';
import { Link as ReachLink } from 'react-router-dom';
import { IoEnterOutline, IoExitOutline } from 'react-icons/io5';
import {
	Button,
	useColorMode,
	Text,
	Link,
	Box,
	Flex,
	Spacer,
	Stack,
	IconButton,
} from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import { UserContext } from './userContext';
import { BiMoon, BiSun } from 'react-icons/bi';
import { FaWindowClose, FaHamburger } from 'react-icons/fa';

const MenuItem = ({ children, isLast, to = '/', ...rest }) => {
	return (
		<Link
			as={ReachLink}
			to={to}
			mb={{ base: isLast ? 0 : 8, sm: 0 }}
			mr={{ base: 0, sm: isLast ? 0 : 8 }}
			display='block'
			style={{ textDecoration: 'none' }}
			{...rest}
		>
			<Button
				_hover={{ bg: 'red.500', color: 'white' }}
				variant='ghost'
				bg='transparent'
				cursor='pointer'
				colorScheme='gray'
			>
				{children}
			</Button>
		</Link>
	);
};

const Navbar = (props) => {
	const history = useHistory();
	const { user, setUser } = useContext(UserContext);
	const { colorMode, toggleColorMode } = useColorMode();
	const [show, setShow] = useState(false);
	const toggleMenu = () => setShow(!show);

	async function logout() {
		console.log('Loggar ut');

		try {
			const settings = {
				method: 'GET',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				credentials: 'include',
			};
			const res = await fetch(
				'http://localhost:5000/api/v1/user/logout',
				settings
			);

			const done = await res.json();

			if (done) {
				setUser(false);
				history.push('/', { from: 'Home' });
			}
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<Flex
			as='nav'
			align='center'
			justify='space-between'
			wrap='wrap'
			w='100%'
			mb={8}
			bg={['primary.500', 'primary.500', 'transparent', 'transparent']}
			p={[8, 8, 3, 3]}
			pt={8}
			{...props}
		>
			<Flex align='center'>
				<Link to='/' as={ReachLink} style={{ textDecoration: 'none' }}>
					<Flex align='center' justify='center'>
						<img
							src='./assets/images/git.png'
							width='20px'
							height='20px'
							display='inline-block'
						/>
						<Text
							fontSize='4xl'
							as='h1'
							color='blue.600'
							fontWeight='extrabold'
							display='inline-block'
						>
							Ami
							<Text as='span' color='red.500'>
								cus
							</Text>
						</Text>
					</Flex>
				</Link>
			</Flex>

			<Box display={{ base: 'block', md: 'none' }} onClick={toggleMenu}>
				{show ? <FaWindowClose /> : <FaHamburger />}
			</Box>

			<Box
				display={{ base: show ? 'block' : 'none', md: 'block' }}
				flexBasis={{ base: '100%', md: 'auto' }}
			>
				<Flex
					align='center'
					justify={['center', 'space-between', 'flex-end', 'flex-end']}
					direction={['column', 'row', 'row', 'row']}
					pt={[4, 4, 0, 0]}
				>
					<MenuItem to='/'>Hem</MenuItem>
					<MenuItem to='/forum'>Forum</MenuItem>
					<MenuItem to='/about'>Om oss</MenuItem>
					<MenuItem to='/'>Index.html</MenuItem>

					{user?.username ? (
						<MenuItem to={`/user/profile/${user._id}`}>Min profil</MenuItem>
					) : null}

					{user ? (
						<MenuItem to='#' onClick={logout}>
							Logga ut <IoExitOutline />
						</MenuItem>
					) : (
						<Link pr={5} as={ReachLink} to='/login'>
							<Button
								rightIcon={<IoEnterOutline />}
								colorScheme='teal'
								variant='outline'
							>
								Logga in
							</Button>
						</Link>
					)}

					<IconButton
						icon={colorMode === 'light' ? <BiMoon /> : <BiSun />}
						onClick={toggleColorMode}
						variant='outline'
						bg='transparent'
						cursor='pointer'
						colorScheme='gray'
					/>
				</Flex>
			</Box>
		</Flex>
	);
};
export default Navbar;
