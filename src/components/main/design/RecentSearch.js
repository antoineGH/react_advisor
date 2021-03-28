import React from 'react'

import { useHistory } from 'react-router-dom'

import Button from 'react-bootstrap/Button'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)

export default function RecentSearch({ recentSearch }) {
	const history = useHistory()

	// --- handleClick function, triggered with Button onClick => routes to Advisor ---
	function handleClick() {
		history.push({
			pathname: '/search/' + recentSearch.city.replaceAll(' ', '_').trim().toLowerCase(),
			state: {
				latLng: { city: recentSearch.city, lat: recentSearch.lat, lng: recentSearch.lng },
			},
		})
	}

	return (
		<Button onClick={handleClick} variant='btn recent_search_btn' className='mb-2 ml-2'>
			<FontAwesomeIcon size='lg' icon={['fas', 'map-marker-alt']} /> {recentSearch.city}
		</Button>
	)
}
