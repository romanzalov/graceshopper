import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import axios from 'axios'

class CategoryProducts extends Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	render() {
		const foundProduct = this.props.products.find(product => product.id === parseInt((this.props.match.params.id)))
        const foundCategory = this.props.categories.find(category => category.id === parseInt((this.props.match.params.id)))
		return (
            <div className="container">
            <div className="row">
              <div className="col-lg-3">
        
                <h1 className="my-4">{foundCategory.name}</h1>
                <div className="list-group">
                <Link disabled className="list-group-item" to={`/`}>View All</Link>
                {this.props.categories.map(category => {
                    return(<Link key={category.id} disabled className="list-group-item" to={`/category/${category.id}`}>{category.name}</Link>)
                })}
                </div>

            </div>
        
              <div className="col-lg-9">
              <br/>
              <div id="carouselExampleIndicators" className="carousel slide my-4" data-ride="carousel">
                <ol className="carousel-indicators">
                  <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                  <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                  <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                </ol>
                <div className="carousel-inner" role="listbox">
                  <div className="carousel-item active">
                  <img className="d-block img-fluid" src="/images/croppedImage1.jpeg" alt="First slide"/>
                  </div>
                  <div className="carousel-item">
                  <img className="d-block img-fluid" src="/images/croppedImage2.png" alt="Second slide"/>
                  </div>
                  <div className="carousel-item">
                  <img className="d-block img-fluid" src="/images/TysonCropped.png" alt="Third slide"/>
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
        
              <div className="row">
                {foundCategory.products.map(product => {
                  return(
                    <div className="col-lg-4 col-md-6 mb-4" key={product.id}>
                    <div className="card h-100">
                    <a href={`/product/${product.id}`}><img className="card-img-top" src={product.imageUrls[0]} alt=""/></a>
                      <div className="card-body">
                        <h4 className="card-title">
                          <Link to={`/product/${product.id}`}>{product.title}</Link>
                        </h4>
                        <h5>${product.price}</h5>
                        <p className="card-text">{product.description}</p>
                      </div>
                      <div className="card-footer">
                        <small className="text-muted">&#9733; &#9733; &#9733; &#9733; &#9734;</small>
                      </div>
                    </div>
                  </div>              
                  )
                })}
        
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
        categories: state.categories,
	}
}

const mapDispatchToProps = function (dispatch) {
	return {
		addToCart: (id) => {
			dispatch(addProductToCart(id))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryProducts)
