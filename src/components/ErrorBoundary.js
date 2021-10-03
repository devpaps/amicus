import React, { Component } from 'react';

export default class ErrorBoundary extends Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error) {
		// Update state so the next render will show the fallback UI.
		return { hasError: true };
	}

	componentDidCatch(error, errorInfo) {
		console.log('Logging ', error, errorInfo);
	}

	render() {
		if (this.state.hasError) {
			return (
				<div>
					<h2>Något gick fel, kontakta supporten.</h2>
				</div>
			);
		}

		return this.props.children;
	}
}
