import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'


class Checkout extends Component {
	constructor(props) {
		super(props);
	}
	render() {
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
                <label for="exampleInputEmail1"><b>Name on Card</b></label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
            </div>

            <div className="form-group">
                <label for="exampleInputEmail1"><b>Credit Card Number</b></label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
            </div>
                        
            <div className="form-group col-sm-4" style={{paddingLeft:"0px", display:"inline-block"}}>            
                <label style={{paddingLeft:"0px"}} for="cvv"><b>CVV Code</b></label>
                <input type="text" className="form-control" name="cvv" id="cvv" placeholder="Security Code"/>
            </div>
            <div className="form-group col-sm-offset-5 col-sm-6" style={{paddingLeft:"0px", float:"right", display:"inline-block"}}>            
            
            <label style={{paddingLeft:"0px"}} for="expiry"><b>Expiry</b></label>
            <div className="row" style={{marginLeft:"0px"}}>
                <input type="text" className="form-control" name="year" id="cvv" placeholder="YYYY" 
                style={{width:"40%", display:"inline-block", marginRight:"10px"}}/>
                <input type="text" className="form-control" name="month" id="cvv" placeholder="MM" style={{width:"40%", display:"inline-block"}}/>
            </div>
            
            </div>
            </div>
				<button type="submit" className="btn btn-primary" style={{"margin-top":"0px"}}><b>Submit Order</b></button>
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
