import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'


class Checkout extends Component {
	constructor(props) {
		super(props);
	}
	render() {
        const stripe = Stripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh');
        const elements = stripe.elements();
		return (
			<div className="container">
			<h1 className="my-4">Checkout</h1>
			<div className="row" style={{"paddingBottom":"10px"}}>
		
            <div className="col-lg-6">
                <h3>Order Summary</h3>
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
                        Item Name here
                    </td>
                    <td>$59.99</td> 
                    <td>
                    3 
                    &nbsp; &nbsp;
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
                      Item Name here
                  </td>
                  <td>$59.99</td> 
                    <td>
                    3 
                    &nbsp; &nbsp;
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
            </div>

			<div className="col-lg-6">
            <h3>Payment & Shipping Information</h3>
            <div className="form-group">
            <div className="form-group">
                <label for="exampleInputEmail1"><b>Email</b></label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
            </div>            

            <div className="form-group">
                <label for="exampleInputEmail1"><b>Shipping Address</b></label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
            </div>            

            <div className="form-group">
                <label for="exampleInputEmail1"><b>Credit Card Number</b></label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
            </div>            


            <form action="/charge" method="post" id="payment-form">
                    <div className="form-row">
                        <label for="card-element">
                        Credit or debit card
                        </label>
                        <div id="card-element">
                        </div>

                        <div id="card-errors" role="alert"></div>
                    </div>

                    <button>Submit Payment</button>
            </form>

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

export default connect(mapStateToProps,mapDispatchToProps)(Checkout)
