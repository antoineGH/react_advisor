import React from 'react'
import BreadCrumb from '../design/BreadCrumb'
import Award from '../design/Award'
import ExploreCity from '../design/ExploreCity'
import Titles from '../design/Titles'
import Planning from '../design/Planning'
import CategoryList from './category/CategoryList'
import WeatherContainer from './weather/WeatherContainer'
import InterestList from './interest/InterestList'
import HotelContainer from './hotel/HotelContainer'
import RestaurantContainer from './restaurant/RestaurantContainer'
import uniqueCategories from './utils/uniqueCategories'
import toTitle from '../utils/toTitle'
import { Container, Row, Col } from 'react-bootstrap'

export default function InterestContainer({ interests, filterCategories, latLng, nameURLRating, setActiveCategory }) {
	const state = interests[0].location.state
	const country = interests[0].location.country
	const categories = uniqueCategories(interests)

	return (
		<>
			<Container>
				<BreadCrumb country={country} state={state} latLng={latLng} />
				<ExploreCity latLng={latLng} />
				<Row>
					<Col md={12}>
						<div className='weather_container' style={{ background: '#f2f2f2', opacity: false }}>
							<WeatherContainer country={country} state={state} latLng={latLng} details={false} />
						</div>
					</Col>
				</Row>
			</Container>
			<HotelContainer latLng={latLng} city={toTitle(latLng.city)} />
			<RestaurantContainer latLng={latLng} city={toTitle(latLng.city)} />
			<Container>
				<Titles title={'Essential ' + toTitle(latLng.city)} />
				<Planning latLng={latLng} interests={interests} nameURLRating={nameURLRating} />
				<br />
				<CategoryList latLng={latLng} categories={categories} filterCategories={filterCategories} setActiveCategory={setActiveCategory} />
			</Container>
			<Container fluid>
				<InterestList interests={interests} nameURLRating={nameURLRating} />
			</Container>
			<Award />
		</>
	)
}
