import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { editProduct, fetchCategories } from '../store'
import axios from 'axios'

class EditProduct extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	handleSubmit = event => {

		console.log('event', event.target.availability.value)
		console.log("category values: ", event.target.categories)
		let categoryIDs = [];
		let uncheckedCategoryIDs = [];
		event.target.categories.forEach(checkbox => {
			if (checkbox.checked) {
				console.log("checked: ", checkbox.value);
				categoryIDs.push(parseInt(checkbox.value));
			}			
			else {
				uncheckedCategoryIDs.push(parseInt(checkbox.value));
			}
			console.log("categoryIDs: ", categoryIDs);
		})
		event.preventDefault();
		const title = event.target.title.value;
		const description = event.target.description.value;
		const quantity = event.target.quantity.value;
		const price = event.target.price.value;
		const availability = event.target.availability.value === 'Available';
		const id = this.props.product.id;
		const categories = [];
		this.props.editProduct({ ...this.props.product, title, description, quantity, price, availability, categories: categoryIDs, removecategories: uncheckedCategoryIDs}, id)
		.then(result => {
			this.props.history.push('/admin-dashboard');
		});
	}

	componentDidMount() {
		this.props.fetchCategories();
		this.setState({
			productCategories:this.props.product.categories,
		});
		axios.get(`/api/products/${this.props.match.params.id}`).then(response => {
			this.setState({
				product: response.data,
			})
		});		
	}

	render() {
		const { product, categories } = this.props;
		const categoryIDs = [];
		console.log("this.state.product: ", this.state.product);
		if (this.state.product && this.state.product.categories) {
			this.state.product.categories.forEach(category => {
				categoryIDs.push(category.id);
			})
		}		
		// if (this.props.product && this.props.product.categories) {
		// 	this.props.product.categories.forEach(category => {
		// 		categoryIDs.push(category.id);
		// 	})
		// }
		// else {
		// 	categories.forEach(category => {
		// 		category.products.forEach(product => {
		// 			if (parseInt(product.id) == parseInt(this.props.product.id)) {
		// 				categoryIDs.push(category.id);
		// 			}
		// 		})
		// 	});
		// }
		console.log('props', this.props)
		// console.log('product', product)
		console.log("categoryIDs: ", categoryIDs, product);
		return (
			<div className="container">
				<form onSubmit={this.handleSubmit}>
					<h1 className="my-4">Edit Product</h1>
					<div className="row" style={{ "paddingBottom": "10px" }}>
						<div className="col-lg-6">
							<div className="form-group">
								<label><b>Product Title</b></label>
								<input type="string" className="form-control" id="title" aria-describedby="emailHelp" defaultValue={product.title} />
							</div>
							<div className="form-group">
								<label><b>Product Description</b></label>
								<input type="text" className="form-control" id="description" defaultValue={product.description} />
							</div>
							<div className="form-group">
								<label><b>Quantity</b></label>
								<input type="number" className="form-control" id="quantity" defaultValue={product.quantity} />
							</div>
							<div className="form-group">
								<label><b>Availability</b></label>
								{product.availability &&
								<select className="form-control" id="availability">
									<option selected>Available</option>
									<option>Not Available</option>
								</select>}
								{!product.availability &&
									<select className="form-control" id="availability">
										<option>Available</option>
										<option selected>Not Available</option>
									</select>}
							</div>
							<div className="form-group">
								<label><b>Price</b></label>
								<input type="number" className="form-control" id="price" defaultValue={product.price} />
							</div>
							<b>Product Categories (Check & Uncheck to Add or Remove Categories)</b>
							<div className="form-check">
								{categoryIDs.length > 0 && categories.map(category => {
									return (
										<div key={category.id}>
											<input type="checkbox" name="categories" value={category.id} defaultChecked={categoryIDs.includes(parseInt(category.id)) ? true : false} className="form-check-input" id={category.name} />
											<label className="form-check-label">{category.name}</label>
											<br />
										</div>
									)
								})}



							</div>
						</div>
						<div className="col-lg-6">
							<div className="form-group">
								<label><b>Product Images</b></label>
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
							<button type="submit" className="btn btn-primary" style={{ "marginTop": "0px" }}><b>Save</b></button>
						</div>
					</div>
				</form>
			</div>
		)
	}
}

const mapStateToProps = function (state, ownProps) {
	return {
		product: state.products.find(product => product.id === +ownProps.match.params.id),
		categories: state.categories
	}
}

const mapDispatchToProps = function (dispatch) {
	return {
		editProduct: (id, product) => dispatch(editProduct(id, product)),
		fetchCategories: () => dispatch(fetchCategories())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProduct)