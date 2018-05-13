import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchAllCategories } from '../store/categories'
import { Link } from 'react-router-dom';

/**
 * COMPONENT
 */
class Categories extends Component {

    constructor(props) {
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
        const listOpen = this.state
        console.log('selected categ: ', this.state.selectedCategory)
        // ({ match: { params, url } })
        // const url = this.props.match.params.url
        return (
            <div className="categories">
                <select onChange={this.handleChange} name="selectedCategory">
                    <option>Select a category</option>
                    {
                        categories.map(category =>
                            // <Link key={category.id} to={url.replace(`{params.categoryId}`, `category.id`)}>

                            <option key={category.id} value={category.id}>{category.name}</option>
                            // {/* </Link> */ }
                        )
                    }
                </select>
            </div>
        )
    }
}
// categories.map(category => {
//     return (
//         <option key={category.id} value={category.id}>{category.name}</option>
//     )
// })
const mapState = (state) => {
    return {
        categories: state.categories,
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
