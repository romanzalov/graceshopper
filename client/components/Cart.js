import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class Cart extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="container">
			<h1 className="my-4">Cart</h1>
			<div className="row" style={{"padding-bottom":"10px"}}>
			<table style={{width:"100%"}} className="table">
			<tbody>
			  <tr>
				<th>Items</th>
				<th>Price</th>
				<th>Quantity</th>
				<th>Remove</th> 
			  </tr>
			  <tr>				  
				<td>
					<div style={{border: "1px solid black", marginBottom:"5px"}}>
						<a href="#"><img className="card-img-top" src="http://placehold.it/700x400" alt="" 
						style={{width:"200px", marginRight:"5px"}}/></a>
						Item description here
					</div>
				</td>
				<td>$59.99</td> 
				<td>
				3 
				<br/><br/>
				<button class="btn btn-danger">-</button>
					&nbsp; &nbsp;
				<button class="btn btn-success">+</button>
				</td> 
			  <td>
				  <button class="btn btn-danger">X</button>
				</td>
			  </tr>

			  <tr>				  
				<td>
					<div style={{border: "1px solid black", marginBottom:"5px"}}>
						<a href="#"><img className="card-img-top" src="http://placehold.it/700x400" alt="" 
						style={{width:"200px", marginRight:"5px"}}/></a>
						Item description here
					</div>
				</td>
				<td>$59.99</td> 
				<td>
				3 
				<br/><br/>
				<button class="btn btn-danger">-</button>
					&nbsp; &nbsp;
				<button class="btn btn-success">+</button>
				</td> 
			  <td>
			  <button class="btn btn-danger">X</button>
			  </td>
			  </tr>
			  
			</tbody>
		  </table>

			<button class="btn btn-success">Checkout</button>
			</div>
			</div>
			)
	}
}

const mapStateToProps = function(state) {
	
}

const mapDispatchToProps = function(dispatch) {

}

export default connect(mapStateToProps,mapDispatchToProps)(Cart)
