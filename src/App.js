import React, { Component } from 'react';
import './App.css';
import Logo from './sinag-logo.png';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			clock: 0,
			daysSpan: 0,
			hoursSpan: 0,
			minutesSpan: 0,
			secondsSpan: 0,
		};
	}

	getTimeRemaining = (endtime) => {
		var t = Date.parse(endtime) - Date.parse(new Date());
		var seconds = Math.floor((t / 1000) % 60);
		var minutes = Math.floor((t / 1000 / 60) % 60);
		var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
		var days = Math.floor(t / (1000 * 60 * 60 * 24));
		return {
			total: t,
			days: days,
			hours: hours,
			minutes: minutes,
			seconds: seconds,
		};
	};

	initializeClock = (deadline) => {
		const date = new Date(Date.parse(new Date()));
		if (deadline <= date) return;

		const updateClock = () => {
			var t = this.getTimeRemaining(deadline);

			this.setState({
				daysSpan: t.days,
				hoursSpan: ('0' + t.hours).slice(-2),
				minutesSpan: ('0' + t.minutes).slice(-2),
				secondsSpan: ('0' + t.seconds).slice(-2),
			});

			if (t.total <= 0) {
				clearInterval(timeinterval);
			}
		};

		updateClock();
		var timeinterval = setInterval(updateClock, 1000);
	};

	componentDidMount = () => {
		var deadline = new Date(Date.parse(new Date()) + 259200000);
		this.initializeClock(deadline);
	};

	render() {
		return (
			<div>
				<div className='img-container'>
					<img src={Logo} alt='sinag-logo' />
				</div>
				<div id='clockdiv'>
					<div>
						<span className='days'>{this.state.daysSpan}</span>
						<div className='smalltext'>Days</div>
					</div>
					<div>
						<span className='hours'>{this.state.hoursSpan}</span>
						<div className='smalltext'>Hours</div>
					</div>
					<div>
						<span className='minutes'>{this.state.minutesSpan}</span>
						<div className='smalltext'>Minutes</div>
					</div>
					<div>
						<span className='seconds'>{this.state.secondsSpan}</span>
						<div className='smalltext'>Seconds</div>
					</div>
				</div>
				<div className='header'>
					<h1>The Sinag Project </h1>
				</div>
			</div>
		);
	}
}

export default App;
