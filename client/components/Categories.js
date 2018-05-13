import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {fetchAllCategories} from '../store/categories'


/**
 * COMPONENT
 */
class Categories extends Component {

    constructor(props){
        super(props)
        this.state = {
            selectedCategory: '' //category ID
        //   listOpen: false,
        //   headerTitle: this.props.title
        }
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount() {
        this.props.getAllCategories();
    }
    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value })
    }
    // handleClickOutside(){
    //     this.setState({
    //       listOpen: false
    //     })
    // }

    // toggleList(){
    //     this.setState(prevState => ({
    //       listOpen: !prevState.listOpen
    //     }))
    // }

    render() {
        const categories = this.props.categories;
        console.log('selected categ: ', this.state.selectedCategory)
        return (
            // <div className="dd-wrapper">
            //     <div className="dd-header" onClick={() => this.toggleList()}>
            //         <div className="dd-header-title"></div>
            //     </div>
            //     {listOpen && <ul className="dd-list">
            //         {categories.map((category) => (
            //          <li className="dd-list-item" key={category.id} >{category.name}</li>
            //          ))}
            //     </ul>}
            // </div>
            <div className="categories">
                <select onChange={this.handleChange} name="selectedCategory">
                    <option>Select a category</option>
                    {
                            categories.map(category => {
                              if (this.props.userCategories.some(o => {return o.categoryId === category.id})) {
                                return (
                                  <option key={category.id} value={category.id}>{category.name}</option>
                                )
                            }
                            })
                        }
                </select>
            </div>
        )}
    }

const mapState = (state) => {
    return {
      categories: state.categories,
      userCategories: state.user.categories
    }
}

const mapDispatch = (dispatch) => {
   return {
     getAllCategories: () => {
        dispatch(fetchAllCategories());
     }
    }
}
export default connect(mapState, mapDispatch)(Categories)
