import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class EditProduct extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="container">
			<h1 className="my-4">Edit Product</h1>
			<div className="row" style={{"padding-bottom":"10px"}}>
			<div className="col-lg-6">
				<div className="form-group">
				  <label for="exampleInputEmail1"><b>Product Title</b></label>
				  <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
				</div>
				<div className="form-group">
				  <label for="exampleInputPassword1"><b>Product Description</b></label>
				  <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
				</div>
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

					  

			</div>
			<div className="col-lg-6">
			<div className="form-group">
			<label for="exampleInputPassword1"><b>Product Images</b></label>
			<div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel" 
			style={{marginTop:"0px !important", paddingTop:"0px"}}
			>
				  <ol className="carousel-indicators">
					  <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
					  <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
					  <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
				  </ol>
				  <div className="carousel-inner" role="listbox">
					  <div className="carousel-item active">
					  <img className="d-block img-fluid" src="http://placehold.it/900x350" alt="First slide"/>
					  </div>
					  <div className="carousel-item">
					  <img className="d-block img-fluid" src="http://placehold.it/900x350" alt="Second slide"/>
					  </div>
					  <div className="carousel-item">
					  <img className="d-block img-fluid" src="http://placehold.it/900x350" alt="Third slide"/>
					  </div>
				  </div>
				  <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
					  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
					  <span className="sr-only">Previous</span>
				  </a>
				  <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
					  <span className="carousel-control-next-icon" aria-hidden="true"></span>
					  <span className="sr-only">Next</span>
				  </a>
		  </div>				  
		  <br/>
			Change Image 1: <input type="file" className="form-control" id="exampleInputPassword1" placeholder="Password" 
			style={{display:"inline-block"}}/>
			Change Image 2: <input type="file" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
			Change Image 3: <input type="file" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
		  </div>
				<button type="submit" className="btn btn-primary" style={{"margin-top":"0px"}}><b>Save</b></button>
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

export default connect(mapStateToProps,mapDispatchToProps)(EditProduct)