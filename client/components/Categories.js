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
            selectedCategory: '',
            userId: '' //category ID
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
        // window.location = document.getElementById("selectedCategory".value)

    }

    // goToCategory() {
    //     window.location = document.getElementById("selectedCategory".value)
    // }
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
        console.log("Categories PROPS ", this.props.match)
        console.log("SATEEAEAEW", this.state)
        // const { params, url } = this.props.match
        // const url = this.props.match.params.url
        // console.log(url)
        return (
            <div className="categories">
                <select onChange={this.handleChange} name="selectedCategory">
                    <option>Select a category</option>
                    {
                        categories.map(category =>
                            //
                            <option key={category.id} value={category.name} >{category.name}</option>
                            //


                        )
                    }
                    {/*  */}
                    {/* <a href={`/${userId}/${category.id}`} /> */}
                </select>
                <Link to={`/${this.state.userId}/${this.state.selectedCategory}`}>
                    <button id="go">Go</button>
                </Link>
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
        userId: state.user.id
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
