import React from 'react'
import { useHistory } from 'react-router-dom'
import toTitle from '../utils/toTitle'
import { Row, Col, NavLink } from 'react-bootstrap'
import _ from 'lodash'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)

export default function BreadCrumb({ country, state, latLng }) {
	let city = ''
	if (_.get(latLng, 'city')) {
		city = latLng.city
	}
	const history = useHistory()

	return (
		<Row>
			<Col md={6}>
				<NavLink onClick={() => history.goBack()}>
					<p style={{ fontSize: '0.85rem' }}>
						{country && (
							<span>
								{country} <FontAwesomeIcon size='xs' icon={['fas', 'greater-than']} />
								{'  '}
							</span>
						)}
						{state && (
							<span>
								{state} <FontAwesomeIcon size='xs' icon={['fas', 'greater-than']} />
								{'  '}
							</span>
						)}
						{city ? <span>{toTitle(city)}</span> : ''}
					</p>
				</NavLink>
			</Col>
		</Row>
	)
}
