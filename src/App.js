import React from 'react'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Home from './components/main/Home'
import Navigation from './components/main/navbar/Navigation'
import Advisor from './components/main/advisor/Advisor'
import InterestFilter from './components/main/advisor/interest/InterestFilter'
import InterestDetails from './components/main/advisor/interest/InterestDetails'
import MapInterests from './components/main/advisor/maps/MapInterests'
import Error from './components/errors/Error'

import './App.css'

function App() {
	return (
		<div className='App'>
			<Router>
				<Navigation />
				<Switch>
					<Route path='/' exact component={Home} />
					<Route path='/search/:city' exact component={Advisor} />
					<Route path='/search/:city/details/:id' exact component={InterestDetails} />
					<Route path='/search/:city/interests' exact component={MapInterests} />
					<Route path='/search/:city/:category' exact component={InterestFilter} />
					<Route path='/' children={<Error errorMessage='Error 404' />} />
				</Switch>
			</Router>
		</div>
	)
}

export default App
