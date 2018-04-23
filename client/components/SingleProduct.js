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
		this.handleSelectChange = this.handleSelectChange.bind(this);


		this.state = {
			showForm: false,
			tempReview: '',
			stars: 1
		};
	}

	handleChange(e) {
		this.setState({
			tempReview: e.target.value
		})
	}

	handleSelectChange(e){
		this.setState({
			stars: parseInt(e.target.value)
		})
	}

	handleSubmit (e) {
		e.preventDefault()
		this.props.addReview({
			content: this.state.tempReview, 
			stars: this.state.stars, 
			userId: this.props.user.id, 
			productId: parseInt(this.props.match.params.id)
		})
		this.setState({
			tempReview: '',
			showForm: false
		})
	}

	handleClick(){
		this.props.addToCart(parseInt((this.props.match.params.id)));
	}

	reviewForm(event){
		event.preventDefault()
		return(
		<form onSubmit = {this.handleSubmit}>
			<label>
    			<input type="text" value = {this.state.tempReview} onChange = {this.handleChange}/>
			</label>
			<label>
			Rate this item:
				<select value={this.state.stars} onChange={this.handleSelectChange}>
					<option value="1">1</option>
					<option value="2">2</option>
					<option value="3">3</option>
					<option value="4">4</option>
					<option value="5">5</option>
				</select>
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
		const {reviews, user} = this.props
		console.log("user", user)
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
								<p className="card-text">{foundProduct.description}</p>
								<span className="text-warning">&#9733; &#9733; &#9733; &#9733; &#9734;</span>
								4.0 stars
							</div>
						</div>
						<div className="card card-outline-secondary my-4">
							<div className="card-header">
								Product Reviews
							</div>
							<div className="card-body">
							{reviews ? reviews.filter(review => review.productId === parseInt(this.props.match.params.id)).map(review => (
								<div key={review.id}>
									<p>{review.content}</p>
									<p>{review.stars} stars out of 5</p>
									<small className="text-muted">Posted by user ID {review.userId} on {review.createdAt.slice(0,10)}</small>
									<hr />
								</div>
							)) : null}
								{user.id ? 
									(<div>
										<a href="#" className="btn btn-success" onClick={this.showForm}>Leave a Review</a>
										{(this.state.showForm) ? this.reviewForm(event) : null}
									</div>) : null
								}
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
		products: state.products,
		reviews: state.reviews,
		user: state.user
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
