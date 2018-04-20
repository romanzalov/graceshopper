import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { addProductToCart } from '../store/cart'
import {addReview} from '../store/reviews'

class SingleProduct extends Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
		this.reviewForm = this.reviewForm.bind(this);
		this.showForm = this.showForm.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);

		this.state = {
			showForm: false,
			tempReview: '',
		};
	}

	handleChange(e) {
		this.setState({
			tempReview: e.target.value
		})
		console.log(this.state.tempReview)
	}	
	handleSubmit (e) {
		e.preventDefault()
		this.props.addReview(this.state.tempReview)

	}

	handleClick(){
		this.props.addToCart(parseInt((this.props.match.params.id)));
	}

	reviewForm(){
		return(
		<form onSubmit = {this.handleSubmit}>
			<label>
    <input type="text" value = {this.state.tempReview} onChange = {this.handleChange}/>
			</label>
			<input type="submit" value="Submit" />
		</form>
		)}

	showForm() {
		if (this.state.showForm) {
			this.setState({
				showForm: false,
			})
		}
		else {
			this.setState({
				showForm: true,
			})
		}
	}


	render() {
		const foundProduct = this.props.products.find(product => product.id === parseInt((this.props.match.params.id)))

		return (
			<div className="container">
				<div className="row">
					<div className="col-lg-3">
						<h1 className="my-4">Import Sports</h1>
						<div className="list-group">
							<a href="#" className="list-group-item active">Category 1</a>
							<a href="#" className="list-group-item">Category 2</a>
							<a href="#" className="list-group-item">Category 3</a>
						</div>
					</div>
					<div className="col-lg-9">
						<div className="card mt-4">
							<img className="card-img-top img-fluid" src="http://placehold.it/900x400" alt=""/>
							<div className="card-body">
								<h3 className="card-title">{foundProduct.title}
								<button style={{"float":"right"}} className="btn btn-success" onClick={this.handleClick}>Add To Cart</button>
								</h3>
								<h4>{foundProduct.price}</h4>
								<p className="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente dicta fugit fugiat hic aliquam itaque facere, soluta. Totam id dolores, sint aperiam sequi pariatur praesentium animi perspiciatis molestias iure, ducimus!</p>
								<span className="text-warning">&#9733; &#9733; &#9733; &#9733; &#9734;</span>
								4.0 stars
							</div>
						</div>
						<div className="card card-outline-secondary my-4">
							<div className="card-header">
								Product Reviews
							</div>
							<div className="card-body">
								<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis et enim aperiam inventore, similique necessitatibus neque non! Doloribus, modi sapiente laboriosam aperiam fugiat laborum. Sequi mollitia, necessitatibus quae sint natus.</p>
								<small className="text-muted">Posted by Anonymous on 3/1/17</small>
								<hr />
								<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis et enim aperiam inventore, similique necessitatibus neque non! Doloribus, modi sapiente laboriosam aperiam fugiat laborum. Sequi mollitia, necessitatibus quae sint natus.</p>
								<small className="text-muted">Posted by Anonymous on 3/1/17</small>
								<hr />
								<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis et enim aperiam inventore, similique necessitatibus neque non! Doloribus, modi sapiente laboriosam aperiam fugiat laborum. Sequi mollitia, necessitatibus quae sint natus.</p>
								<small className="text-muted">Posted by Anonymous on 3/1/17</small>
								<hr />
								<a href="#" className="btn btn-success" onClick={this.showForm}>Leave a Review</a>
								{(this.state.showForm) ? this.reviewForm() : null}
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = function (state) {
	return {
		products: state.products
	}
}

const mapDispatchToProps = function (dispatch) {
	return {
		addToCart: (id) => {
			dispatch(addProductToCart(id))
	
		},
		addReview: (review) => {
			dispatch(addReview(review))
		}
		
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
