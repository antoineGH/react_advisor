import React, { Component } from 'react'

import LineGraph from './LineGraph'

import getDay from './utils/getDay'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'

import classes from './WeatherGraphContainer.module.css'

export default class WeatherGraphContainer extends Component {
	constructor(props) {
		super(props)
		this.state = { data: null, labels: null, label: {}, style: {}, active: 'Temperatures' }
		this.getTemp = this.getTemp.bind(this)
		this.getHumidity = this.getHumidity.bind(this)
		this.getWindSpeed = this.getWindSpeed.bind(this)
		this.getCloud = this.getCloud.bind(this)
	}

	componentDidMount() {
		this.createMockData()
	}

	createMockData() {
		const { current, daily } = this.props

		const labels = ['Today']
		const temps = [current.temp.toFixed(1)]
		const temps_label = { labelGraph: 'Temperatures', labelToolTip: '°C' }
		const temps_style = {
			borderColor: 'rgb(255, 93, 93)',
			backgroundColor: 'rgba(255, 10, 13, 0.1)',
			pointRadius: 3,
			pointBackgroundColor: 'rgb(255, 93, 93)',
			pointHoverRadius: 4,
			pointHoverBackgroundColor: 'rgb(255, 93, 93)',
		}

		daily.forEach((daycast, count) => {
			count++
			labels.push(getDay(count))
			temps.push(daycast.temp.day.toFixed(1))
		})
		this.setState({ data: temps, labels: labels, label: temps_label, style: temps_style })
	}

	getTemp() {
		const { current, daily } = this.props

		const labels = ['Today']
		const temps = [current.temp.toFixed(1)]
		const temps_label = { labelGraph: 'Temperatures', labelToolTip: '°C' }
		const temps_style = {
			borderColor: 'rgb(255, 93, 93)',
			backgroundColor: 'rgba(255, 10, 13, 0.1)',
			pointRadius: 3,
			pointBackgroundColor: 'rgb(255, 93, 93)',
			pointHoverRadius: 4,
			pointHoverBackgroundColor: 'rgb(255, 93, 93)',
		}

		daily.forEach((daycast, count) => {
			count++
			labels.push(getDay(count))
			temps.push(daycast.temp.day.toFixed(1))
		})
		this.setState({ data: temps, labels: labels, label: temps_label, style: temps_style, active: temps_label.labelGraph })
	}

	getHumidity() {
		const { current, daily } = this.props

		const labels = ['Today']
		const temps = [current.humidity]
		const label = { labelGraph: 'Humidity', labelToolTip: '%' }
		const temps_style = {
			borderColor: '#2ab7ca',
			backgroundColor: 'rgba(42, 183, 202, 0.1)',
			pointRadius: 3,
			pointBackgroundColor: '#2ab7ca',
			pointHoverRadius: 4,
			pointHoverBackgroundColor: '#2ab7ca',
		}

		daily.forEach((daycast, count) => {
			count++
			labels.push(getDay(count))
			temps.push(daycast.humidity)
		})
		this.setState({ data: temps, labels: labels, label: label, style: temps_style, active: label.labelGraph })
	}

	getWindSpeed() {
		const { current, daily } = this.props

		const labels = ['Today']
		const temps = [current.wind_speed]
		const label = { labelGraph: 'Wind Speed', labelToolTip: 'Km/h' }
		const temps_style = {
			borderColor: 'rgb(123, 192, 67)',
			backgroundColor: 'rgba(123, 192, 67, 0.1)',
			pointRadius: 3,
			pointBackgroundColor: 'rgb(123, 192, 67)',
			pointHoverRadius: 4,
			pointHoverBackgroundColor: 'rgb(123, 192, 67)',
		}

		daily.forEach((daycast, count) => {
			count++
			labels.push(getDay(count))
			temps.push(daycast.wind_speed)
		})
		this.setState({ data: temps, labels: labels, label: label, style: temps_style, active: label.labelGraph })
	}

	getCloud() {
		const { current, daily } = this.props

		const labels = ['Today']
		const temps = [current.clouds]
		const label = { labelGraph: 'Clouds', labelToolTip: '%' }
		const temps_style = {
			borderColor: 'rgb(246, 205, 97)',
			backgroundColor: 'rgba(246, 205, 97, 0.1)',
			pointRadius: 3,
			pointBackgroundColor: 'rgb(246, 205, 97)',
			pointHoverRadius: 4,
			pointHoverBackgroundColor: 'rgb(246, 205, 97)',
		}

		daily.forEach((daycast, count) => {
			count++
			labels.push(getDay(count))
			temps.push(daycast.clouds)
		})
		this.setState({ data: temps, labels: labels, label: label, style: temps_style, active: label.labelGraph })
	}

	render() {
		const { data, labels, label, style } = this.state
		return (
			<>
				<ListGroup horizontal>
					<Row className='justify-content-center mt-3 ml-2 ml-sm-0'>
						<Col xs={11} md={'auto'} style={{ paddingLeft: '0px', paddingRight: '0px' }} className='ml-xs-0 ml-md-5'>
							<ListGroup.Item className={this.state.active === 'Temperatures' && 'active'} action onClick={this.getTemp}>
								Temperatures
							</ListGroup.Item>
						</Col>
						<Col xs={11} md={'auto'} style={{ paddingLeft: '0px', paddingRight: '0px' }}>
							<ListGroup.Item className={this.state.active === 'Humidity' && 'active'} action onClick={this.getHumidity}>
								Humidity
							</ListGroup.Item>
						</Col>
						<Col xs={11} md={'auto'} style={{ paddingLeft: '0px', paddingRight: '0px' }}>
							<ListGroup.Item className={this.state.active === 'Wind Speed' && 'active'} action onClick={this.getWindSpeed}>
								Wind Speed
							</ListGroup.Item>
						</Col>
						<Col xs={11} md={'auto'} style={{ paddingLeft: '0px', paddingRight: '0px' }}>
							<ListGroup.Item className={this.state.active === 'Clouds' && 'active'} action onClick={this.getCloud}>
								Clouds
							</ListGroup.Item>
						</Col>
					</Row>
				</ListGroup>

				<Card className='card_graph_weather' style={{ padding: '20px' }}>
					<div className={classes.container}>
						<LineGraph data={data} labels={labels} label={label} style={style} />
					</div>
				</Card>
			</>
		)
	}
}
