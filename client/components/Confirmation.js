import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import axios from 'axios'
class Confirmation extends Component {
	constructor(props) {
        super(props);
        this.state = {
            order: {},
            orderInformation: {},
            items: [],
        };
    }
    componentDidMount() {
        axios.get("/api/session").then(response => {
            this.setState({
                order: response.data.lastCart,
                orderInformation:response.data.lastCart.information,
                items:response.data.lastCart.instances,
            })
        })
    }

	render() {
        let orderInfo = this.state.orderInformation;
        console.log("orderInfo: ", orderInfo);
		return (
			<div className="container">
			<h1 className="my-4">Confirmation</h1>
            <div className="row" style={{"paddingBottom":"10px"}}>
            <h2>Your Order Information: 
            <br/><br/>
            </h2>
            <h3>Items</h3>
            {this.state.items.forEach(item => {
                return(item.product.name)
            })}
            </div>
            </div>

			)
	}
}

const mapStateToProps = function(state) {
	
}

const mapDispatchToProps = function(dispatch) {

}

export default connect(mapStateToProps,mapDispatchToProps)(Confirmation)