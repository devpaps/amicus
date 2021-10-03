import React, { useContext } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Forum from './pages/Forum';
import NoAccess from './pages/NoAccess';
import Register from './pages/Register';
import Thread from './pages/Thread';
import Post from './pages/Post';
import Profile from './pages/Profile';
import Edit from './pages/Edit';

import Navbar from './components/Navbar';
import Layout from './components/Layout';
import Footer from './components/Footer';
import { UserContext } from './components/userContext';

import useVerifyAuth from './hooks/verifyAuth';

import ErrorBoundry from './components/ErrorBoundary';

const App = () => {
	const { user } = useContext(UserContext);

	// if user is not authenticated on server
	// run custom hook useTesting
	if (!user) {
		useVerifyAuth();
	}

	return (
		<HelmetProvider>
			<Layout>
				<Navbar />
				<main>
					<Switch>
						<Route exact path='/' component={Home} />

						<Route path='/login' component={Login} />
						<Route path='/signup' component={Register} />
						<Route path='/about' component={About} />
						<Route path='/user/profile/:id' component={Profile} />
						<Route path='/edit' component={Edit} />
						<ErrorBoundry>
							<Route path='/thread' component={Thread} />
							<Route path='/post' component={Post} />

							<Route path='/forum' component={Forum} />
						</ErrorBoundry>
						<Route exact path='/noaccess' component={NoAccess} />
						<Route component={NotFound} />
					</Switch>
				</main>
				<Footer />
			</Layout>
		</HelmetProvider>
	);
};

export default App;
