import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import history from '../history';
import { addCategory } from '../store'


class AddCategory extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <h1 className="my-4">Categories</h1>
            <div className="list-group">
              <div id="addCategory">
                <form onSubmit={this.props.addCategory}>
                  <input type="text" id='category' placeholder="Add category" style={{ "marginBottom": "30px", "height": "2.5rem", "width": "70%", display: "inline-block" }}></input>
                  <button className="btn btn-primary" style={{ "width": "20%", display: "inline-block", "marginLeft": "5px" }}>Add</button>
                </form>
              </div>
              {this.props.categories.map(category => {
                return (<Link key={category.id} disabled className="list-group-item" to={`/category/${category.id}`}>{category.name}</Link>)
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
    categories: state.categories
  }
}

const mapDispatchToProps = function (dispatch) {
  return {
    addCategory: event => {
      event.preventDefault()
      dispatch(addCategory({name: event.target.category.value}))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCategory)
