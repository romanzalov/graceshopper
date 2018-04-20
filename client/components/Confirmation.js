import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class Confirmation extends Component {
	constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        axios.get("/api/session").then(response => {
            this.setState({
                orderInformation:response.data.lastCart.information,
            })
        })
    }

	render() {
        let orderInfo = this.state.orderInformation;
		return (
			<div className="container">
			<h1 className="my-4">Confirmation</h1>
            <div className="row" style={{"paddingBottom":"10px"}}>
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