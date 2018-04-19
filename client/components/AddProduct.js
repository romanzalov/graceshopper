import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class AddProduct extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="container">
			<h1 className="my-4">Add Product</h1>
			<div className="row" style={{"padding-bottom":"10px"}}>
			<div className="col-lg-6">
				<div className="form-group">
				  <label for="exampleInputEmail1"><b>Product Title</b></label>
				  <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
				  <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
				</div>
				<div className="form-group">
				  <label for="exampleInputPassword1"><b>Product Description</b></label>
				  <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
				</div>
				<div className="form-group">
				  <label for="exampleInputPassword1"><b>Product Images (up to 3)</b></label>
				  <input type="file" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
				  <input type="file" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
				  <input type="file" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
				</div>
			</div>
			<div className="col-lg-6">
				<div className="form-group">
				  <label for="exampleInputPassword1"><b>Quantity</b></label>
				  <input type="number" className="form-control" id="exampleInputPassword1" placeholder="Enter Quantity"/>
				</div>

				<div className="form-group">
					<label for="exampleInputPassword1"><b>Price</b></label>
					<input type="number" className="form-control" id="exampleInputPassword1" placeholder="Enter Price"/>
				</div>
				<b>Product Categories</b>
				<div className="form-check">
					<input type="checkbox" className="form-check-input" id="exampleCheck1"/>
					<label className="form-check-label" for="exampleCheck1">Check me out</label>
					<br/>
					<input type="checkbox" className="form-check-input" id="exampleCheck1"/>
					<label className="form-check-label" for="exampleCheck1">Check me out</label>
					<br/>
					<input type="checkbox" className="form-check-input" id="exampleCheck1"/>
					<label className="form-check-label" for="exampleCheck1">Check me out</label>
					<br/>
					<input type="checkbox" className="form-check-input" id="exampleCheck1"/>
					<label className="form-check-label" for="exampleCheck1">Check me out</label>
					<br/>
					<input type="checkbox" className="form-check-input" id="exampleCheck1"/>
					<label className="form-check-label" for="exampleCheck1">Check me out</label>
					<br/>
				</div>
				<button type="submit" className="btn btn-primary" style={{"margin-top":"10px"}}><b>Submit</b></button>
			</div>
			</div>
			</div>

			)
	}
}

const mapStateToProps = function(state) {
	
}

const mapDispatchToProps = function(dispatch) {

}

export default connect(mapStateToProps,mapDispatchToProps)(AddProduct)