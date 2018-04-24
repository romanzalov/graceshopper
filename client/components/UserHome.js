import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import axios from 'axios'
import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */
export const UserHome = (props) => {
  const availableProducts = props.products.filter(product => product.availability === true)

  return (
  <div className="container">
    <div className="row">
      <div className="col-lg-3">

        <h1 className="my-4">Categories</h1>
        <div className="list-group">
        <div id="searchBar">
        <form onSubmit={function(event) {
            event.preventDefault();
        }}>
          <input type="text" placeholder="Search" style={{"marginBottom":"5px", "width":"70%", display:"inline-block"}}></input>
          <button style={{"width":"20%", display:"inline-block", "marginLeft":"5px"}}>Go</button>
        </form>
        </div>
        {props.categories.map(category => {
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

class UserHome extends Component {
	constructor(props) {
		super(props);
		this.state = {
      showChangePassword:false,
      products: [],
    };
    this.searchProducts = this.searchProducts.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    axios.get('/api/products').then(products => {
      this.setState({
        products:products.data,
      })
    });
  }
  searchProducts(event) {
    event.preventDefault();
    let term = event.target.searchterm.value;
    if (term == "") {
      axios.get('/api/products/').then(response => {
        this.setState({
          products:response.data,
        })
      })      
    }
    else {
      axios.get('/api/products/search/' + term).then(response => {
        this.setState({
          products:response.data,
        })
      })
    }
  }
  handleChange(event) {
    let searchTerm = event.target.value;
    console.log("Changing: ", event.target.value);
    if (searchTerm == "") {
      axios.get('/api/products/').then(response => {
        this.setState({
          products:response.data,
        })
      })      
    }
  }
  // export const UserHome = (props) => {
  render() {
    console.log("this.state: ", this.state);
    // const availableProducts = this.props.products.filter(product => product.availability === true)
    const availableProducts = this.state.products.filter(product => product.availability === true)
    return (
    <div className="container">
    <div className="row">
    <div className="col-lg-3">
    
    <h1 className="my-4">Categories</h1>
    <div className="list-group">
    <div id="searchBar">
    <form onSubmit={this.searchProducts}>
    <input onChange={this.handleChange} type="text" placeholder="Search" name="searchterm" style={{"marginBottom":"5px", "width":"70%", display:"inline-block"}}></input>
    <button style={{"width":"20%", display:"inline-block", "marginLeft":"5px"}}>Go</button>
    </form>
    
    </div>
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
    
    <div className="row">
    {availableProducts.map(product => {
      return(
        <div className="col-lg-4 col-md-6 mb-4" key={product.id}>
        <div className="card h-100">
        <a href="#"><img className="card-img-top" src={product.imageUrls[0]} alt=""/></a>
        <div className="card-body">
        <h4 className="card-title">
        <Link to={`/product/${product.id}`}>{product.title}</Link>
        </h4>
                <h5>${product.price}</h5>
                <p className="card-text">{product.description}</p>
        </div>
        </div>
        </div>
              )
            })}
            
              </div>
              <div className="card-footer">
                <small className="text-muted"></small>
              </div>
            </div>
          )
        }
        }
        
/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    categories: state.categories,
    email: state.user.email,
    products: state.products,
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
