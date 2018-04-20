import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {editProduct} from '../store'

class EditProduct extends Component {
	constructor(props) {
		super(props);
	}

	handleSubmit = event => {
		event.preventDefault();
		const title = event.target.title.value;
		const description = event.target.description.value;
		const quantity = event.target.quantity.value;
		const availability = event.target.availability.value;
		const price = event.target.price.value;
		const id = this.props.product.id;
		editProduct(id, {title, description, quantity, availability, price});

	}

	render() {
		const { product } = this.props;
		console.log('props', this.props)
		console.log('product', product)
		return (
			<div className="container">
				<form onSubmit={this.props.handleSubmit}>
					<h1 className="my-4">Edit Product</h1>
					<div className="row" style={{ "padding-bottom": "10px" }}>
						<div className="col-lg-6">
							<div className="form-group">
								<label for="title"><b>Product Title</b></label>
								<input type="string" className="form-control" id="title" aria-describedby="emailHelp" placeholder="Enter Product Title" value={product.title} />
							</div>
							<div className="form-group">
								<label for="description"><b>Product Description</b></label>
								<input type="text" className="form-control" id="description" value={product.description} placeholder="Enter Product Description" />
							</div>
							<div className="form-group">
								<label for="quantity"><b>Quantity</b></label>
								<input type="number" className="form-control" id="quantity" value={product.quantity} placeholder="Enter Quantity" />
							</div>
							<div className="form-group">
								<label for="availability"><b>Availability</b></label>
								<input type="number" className="form-control" id="availability" value={product.availability} placeholder="Enter Quantity" />
							</div>
							<div className="form-group">
								<label for="price"><b>Price</b></label>
								<input type="number" className="form-control" id="price" value={product.price} placeholder="Enter Price" />
							</div>
							<b>Product Categories</b>
							<div className="form-check">
								<input type="checkbox" className="form-check-input" id="exampleCheck1" />
								<label className="form-check-label" for="exampleCheck1">Check me out</label>
								<br />
								<input type="checkbox" className="form-check-input" id="exampleCheck1" />
								<label className="form-check-label" for="exampleCheck1">Check me out</label>
								<br />
								<input type="checkbox" className="form-check-input" id="exampleCheck1" />
								<label className="form-check-label" for="exampleCheck1">Check me out</label>
								<br />
								<input type="checkbox" className="form-check-input" id="exampleCheck1" />
								<label className="form-check-label" for="exampleCheck1">Check me out</label>
								<br />
								<input type="checkbox" className="form-check-input" id="exampleCheck1" />
								<label className="form-check-label" for="exampleCheck1">Check me out</label>
								<br />
							</div>



						</div>
						<div className="col-lg-6">
							<div className="form-group">
								<label for="exampleInputPassword1"><b>Product Images</b></label>
								<div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel"
									style={{ marginTop: "0px !important", paddingTop: "0px" }}
								>
									<ol className="carousel-indicators">
										<li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
										<li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
										<li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
									</ol>
									<div className="carousel-inner" role="listbox">
										<div className="carousel-item active">
											<img className="d-block img-fluid" src="http://placehold.it/900x350" alt="First slide" />
										</div>
										<div className="carousel-item">
											<img className="d-block img-fluid" src="http://placehold.it/900x350" alt="Second slide" />
										</div>
										<div className="carousel-item">
											<img className="d-block img-fluid" src="http://placehold.it/900x350" alt="Third slide" />
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
								<br />
								Change Image 1: <input type="file" className="form-control" id="exampleInputPassword1" placeholder="Password"
									style={{ display: "inline-block" }} />
								Change Image 2: <input type="file" className="form-control" id="exampleInputPassword1" placeholder="Password" />
								Change Image 3: <input type="file" className="form-control" id="exampleInputPassword1" placeholder="Password" />
							</div>
							<button type="submit" className="btn btn-primary" style={{ "margin-top": "0px" }}><b>Save</b></button>
						</div>
					</div>
				</form>
			</div>
		)
	}
}

const mapStateToProps = function (state, ownProps) {
	return {
		product: state.products.find(product => product.id === +ownProps.match.params.id)
	}
}

const mapDispatchToProps = function (dispatch) {
	return {
		editProduct: (id, product) => dispatch(editProduct(id, product))

	}
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProduct)
