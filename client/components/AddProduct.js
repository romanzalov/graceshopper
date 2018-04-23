import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { addProduct } from '../store'

class AddProduct extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		console.log("Categories: ", this.props.categories);
		return (
			<div className="container">
				<h1 className="my-4">Add Product</h1>
				<form onSubmit={this.props.handleSubmit}>
					<div className="row" style={{ "padding-bottom": "10px" }}>
						<div className="col-lg-6">
							<div className="form-group">
								<label><b>Product Title</b></label>
								<input type="string" className="form-control" id="productTitle" aria-describedby="emailHelp" placeholder="Enter product name" />
								<small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
							</div>
							<div className="form-group">
								<label><b>Product Description</b></label>
								<input type="string" className="form-control" id="productDescription" placeholder="Enter description" />
							</div>
							<div className="form-group">
								<label><b>Product Images (up to 3)</b></label>
								<input type="file" className="form-control" id="imageUrl1" placeholder="Password" />
								<input type="file" className="form-control" id="imageUrl2" placeholder="Password" />
								<input type="file" className="form-control" id="imageUrl3" placeholder="Password" />
							</div>
						</div>
						<div className="col-lg-6">
							<div className="form-group">
								<label><b>Quantity</b></label>
								<input type="number" className="form-control" id="quantity" placeholder="Enter Quantity" />
							</div>

							<div className="form-group">
								<label><b>Price</b></label>
								<input type="number" className="form-control" id="price" placeholder="Enter Price" />
							</div>
							<b>Product Categories</b>
							<div className="form-check">
								{this.props.categories.map(category => {
									return(
										<div key={category.id}>
											<input value={category.id} name="categories" type="checkbox" className="form-check-input" id="exampleCheck1" />
											<label value={category.id} className="form-check-label" for="exampleCheck1">{category.name}</label>
											<br />
										</div>												
									)
								})}
							</div>
							<button type="submit" className="btn btn-primary" style={{ "margin-top": "10px" }}><b>Submit</b></button>
						</div>
					</div>
				</form>
			</div>

		)
	}
}

const mapStateToProps = function (state) {
	return {
		categories:state.categories,
	}
}

const mapDispatchToProps = function (dispatch, ownProps) {
	return {
		handleSubmit: event => {
			event.preventDefault();
			console.log('event', event.target.productTitle.value)
			const productTitle = event.target.productTitle.value
			const productDescription = event.target.productDescription.value
			const quantity = event.target.quantity.value
			const price = event.target.price.value
			const categoryChecklist = event.target.categories		
			console.log("categoryChecklist: ", categoryChecklist)
			let categoryIDs = [];
			categoryChecklist.forEach(checkbox => {
				if (checkbox.checked) {
					categoryIDs.push(parseInt(checkbox.value));
				}			
			})
			console.log("categoryIDs: ", categoryIDs);
			// dispatch(addProduct({
			// 	sportType: 'Baseball',
			// 	title: productTitle,
			// 	description: productDescription,
			// 	quantity,
			// 	price,
			// categories:categoryIDs
			// }))
			ownProps.history.push('/admin-dashboard')
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AddProduct)
