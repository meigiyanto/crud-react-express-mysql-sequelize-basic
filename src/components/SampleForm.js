import React from 'react';

class SampleForm extends React.Component {
	constructor(props) {
		super(props)
		this.state = { fullname: '', age: 0, fruit: '', message: '' }

		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleChange(event) {
		this.setState({...this.state, [event.target.name]: event.target.value })
	}

	handleSubmit(event) {
		event.preventDefault()
		console.log({...this.state})
	}

	render() {
		return (
			<div className="container">
				<form onSubmit={this.handleSubmit}>
					<div className="row">
						<div className="col-25">
							<label htmlFor="fullname">Full Name</label>
						</div>
						<div className="col-75">
							<input type="text" id="fullname" name="fullname" value={this.state.fullname} onChange={this.handleChange} placeholder="Your full name.." />
						</div>
					</div>
				<div className="row">
					<div className="col-25">
						<label htmlFor="age">Age</label>
					</div>
					<div className="col-75">
						<input type="number" id="age" value={this.state.age} onChange={this.handleChange} name="age" placeholder="Your age.." />
					</div>
				</div>
				<div className="row">
					<div className="col-25">
						<label htmlFor="fruit">Choose Your Favorite Fruit</label>
					</div>
					<div className="col-75">
						<select id="fruit" name="fruit" value={this.state.value} onChange={this.handleChange}>
							<option value="apple">Apple</option>
							<option value="banana">Banana</option>
							<option value="cherry">Cherry</option>
						</select>
					</div>
		 		</div>
				<div className="row">
					<div className="col-25">
						<label htmlFor="message">Message</label>
					</div>
					<div className="col-75">
						<textarea id="message" name="message" value={this.state.message} onChange={this.handleChange} placeholder="Write something.." />
					</div>
				</div>
				<div className="row">
					<input type="submit" value="Submit" />
		  	</div>
			</form>
		</div>
		)
	}
}


export default SampleForm;