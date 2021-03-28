import React, { useState, useEffect } from 'react'

import toTitle from '../../utils/toTitle'
import getDay from './utils/getDay'
import getDatetime from './utils/getDatetime'
import fetchWeather from './utils/fetchWeather'

import WeatherGraphContainer from './WeatherGraphContainer'

import ScaleLoader from 'react-spinners/ScaleLoader'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Image from 'react-bootstrap/Image'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)

export default function WeatherContainer({ country, state, latLng, details }) {
	// --- WeatherContainer State Management ---
	const [hasError, setHasError] = useState(false)
	const [isLoaded, setIsLoaded] = useState(false)
	const [current, setCurrent] = useState(null)
	const [daily, setDaily] = useState(null)
	const [showDetails, setShowDetails] = useState(false)

	let city = latLng.city

	// Control for missing arguments
	country ? (country = <span>{country}</span>) : (country = '')
	state ? (state = <span>{state},</span>) : (state = '')
	city ? (city = <span>{toTitle(city)},</span>) : (city = '')

	useEffect(() => {
		details && setShowDetails(true)
	}, [details])

	useEffect(() => {
		if (latLng.lat && latLng.lng === undefined) return
		const lat = latLng.lat
		const lng = latLng.lng

		fetchWeather(lat, lng)
			.then((response) => {
				setCurrent(response.current)
				setDaily(response.daily)
				setIsLoaded(true)
				setHasError(false)
			})
			.catch((error) => {
				setHasError(true)
			})
	}, [latLng])

	// --- HandleClick Retry fetchWeather ---
	function handleClick() {
		const lat = latLng.lat
		const lng = latLng.lng

		setIsLoaded(false)
		setHasError(false)

		setTimeout(() => {
			fetchWeather(lat, lng)
				.then((response) => {
					setCurrent(response.current)
					setDaily(response.daily)
					setIsLoaded(true)
					setHasError(false)
				})
				.catch((error) => {
					setHasError(true)
				})
		}, 1500)
	}

	function handleClickDetails() {
		setShowDetails(!showDetails)
	}

	if (hasError) {
		return (
			<>
				<Row className='text-center'>
					<Col>
						<p>
							Impossible to get the Weather. Please try again later <FontAwesomeIcon size='2x' icon={['fas', 'cloud-sun']} />
						</p>
						<Button onClick={handleClick} variant='dark'>
							Try Again&nbsp;&nbsp;
							<FontAwesomeIcon size='1x' icon={['fas', 'sync']} />
						</Button>
					</Col>
				</Row>
			</>
		)
	}

	if (!isLoaded) {
		return (
			<>
				<Row>
					<Col md={12}>
						<div className='weather_container_empty'>
							<ScaleLoader css='display: flex; justify-content: center;' color={'#2E3030'} size={15} />
						</div>
					</Col>
				</Row>
			</>
		)
	} else {
		return (
			<>
				<Row>
					<Col sm={12} md={7} lg={8} className='justify-content-center mt-2 ml-5'>
						<div className='weather_breadcrumb'>
							{city} {state} {country}
						</div>
						<div className='weather_today'>
							{getDay(0)}, {getDatetime(current.dt)}
						</div>
						<div className='weather_description'>
							{current.weather[0].main}, {current.weather[0].description}
						</div>
					</Col>
					<Col sm={12} md={3} lg={2} className='justify-content-center mt-4 ml-5'>
						<div className='weather_description_details'>Humidity: {current.humidity} %</div>
						<div className='weather_description_details'>Clouds: {current.clouds} %</div>
						<div className='weather_description_details'>Wind: {current.wind_speed} km/h</div>
					</Col>
				</Row>
				<Row>
					<Col sm={6} className='ml-5 justify-content-center' style={{ marginTop: '-1%' }}>
						<span style={{ fontSize: '2.5rem' }}>{current.temp.toFixed(1)}</span>
						<span style={{ fontSize: '1.5rem' }}>°C</span>
						<Image
							className='mb-3'
							loading='lazy'
							width='60'
							height='60'
							src={'https://openweathermap.org/img/w/' + current.weather[0].icon + '.png'}
						/>
					</Col>
				</Row>
				<Row className='text-center justify-content-center mb-4'>
					{daily.slice(0, 4).map((daycast, count) => {
						count++
						return (
							<Col key={count} xs={5} sm={5} md={3} lg={2} xl={2}>
								<Card className='special-card ml-md-2 mr-md-2 ml-lg-0 mr-lg-0'>
									<Card.Body
										className='justify-content-center text-center'
										style={{ backgroundColor: 'white', borderRadius: '6px', padding: '0.15rem' }}>
										<Card.Title className='play_description mt-1'>{getDay(count)}</Card.Title>
										<Card.Text className='mt-md-1 mb-0'>
											<Image src={'https://openweathermap.org/img/w/' + daycast.weather[0].icon + '.png'} />
										</Card.Text>
										<Card.Text style={{ marginBottom: '-5px' }}>{daycast.weather[0].main}</Card.Text>
										<Card.Text style={{ marginBottom: '-5px' }} className='mt-md-1'>
											{daycast.temp.min.toFixed(1)}°C / {daycast.temp.max.toFixed(1)}°C
										</Card.Text>
									</Card.Body>
								</Card>
							</Col>
						)
					})}
				</Row>
				{showDetails && (
					<>
						<Row className='justify-content-center text-center'>
							<Col>
								<WeatherGraphContainer current={current} daily={daily} />
							</Col>
						</Row>
						<Row>
							<Col xs={12} className='justify-content-center text-center'>
								<Button variant='outline-dark' style={{ borderRadius: 0 }} onClick={handleClickDetails}>
									Less Details&nbsp;
									<FontAwesomeIcon size='1x' icon={['fas', 'angle-up']} />
								</Button>
							</Col>
						</Row>
					</>
				)}
				{!showDetails && (
					<Row>
						<Col xs={12} className='justify-content-center text-center'>
							<Button variant='outline-dark' style={{ borderRadius: 0 }} onClick={handleClickDetails}>
								More Details&nbsp;
								<FontAwesomeIcon size='1x' icon={['fas', 'angle-down']} />
							</Button>
						</Col>
					</Row>
				)}
			</>
		)
	}
}
