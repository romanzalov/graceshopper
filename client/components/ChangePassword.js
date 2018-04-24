import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import { password } from '../store/user'

class ChangePassword extends Component {
	constructor(props) {
		super(props);

		this.state = {
			newPassword: '',
			confirmPassword: '',
			dirty: false
		}
	}

	handleSubmit = event => {
		event.preventDefault();
		console.log(this.state.newPassword)

		this.props.postPassword(this.state.confirmPassword)
		this.setState({
			newPassword: '',
			confirmPassword: '',
			dirty: false
		})

		this.props.history.push('/home')
	}

	render() {
		const {user} = this.props
		return (
			<div className="container">
				<div>
					{ user.id &&
						<div>
							<h3>Account Info</h3>
							<p>{user.email}</p>
						</div>
					}
					<form onSubmit={this.handleSubmit}>
						<div className="form-group">
							<label><b>New Password</b></label>
							<input type="password" className="form-control" 
							onChange={(event) => this.setState({newPassword: event.target.value})}/>
							<label><b>Confirm Password</b></label>
							<input type="password" className="form-control"
							onChange={(event) => this.setState({confirmPassword: event.target.value, dirty: true})}/>
						</div>

						<button 
						type="submit" 
						className="btn btn-primary" 
						style={{ "marginTop": "0px"}}
						disabled={(this.state.newPassword!==this.state.confirmPassword) || this.state.newPassword===""}
						>Save</button>
						{this.state.dirty && (this.state.newPassword!==this.state.confirmPassword) ? <div className="alert alert-warning">Passwords must match</div> : null}
					</form>
				</div>
			</div>

			)
	}
}

const mapStateToProps = function(state) {
	return {
		user: state.user
	}
}

const mapDispatchToProps = function(dispatch) {
	return {
		postPassword: (pass) => {
			dispatch(password(pass))
		}
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(ChangePassword)
