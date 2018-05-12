import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { User, Progress } from './index'
import { fetchAllCategories, postCategory } from '../store/categories'
import { me } from '../store';

const divStyle = {
    marginTop: '590px'
};

class UserSummary extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            isClicked: false,
            username: ''
        }
    }
    onBtnClick = (e) => {
        this.setState({ isClicked: true })
    }
    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const name = this.state.name
        this.props.postNewCategory({ name })
        this.setState({ name: '' })
    }
    componentDidMount() {
        this.props.getAllCategories();
        this.props.loadInitialData()
    }

    render() {

        const categories = this.props.categories
        const username = this.props.username || ''
        console.log("STATE IN USER SUMMARY", this.props)

        return (
            <div className="summary-container">
                <h2 className="category-list">Your Summary</h2>
                <div className="container-progress">
                    {
                        categories.map((category, i) => {
                            return (
                                <div className="category-name" style={divStyle} key={i}>
                                    <Link to={{ pathname: `/${username}/${category.name}`, state: { name: category.name } }} className='category' key={category.id}>
                                        <div className="progress-list">
                                            <Progress name={category.name} />
                                        </div>
                                    </Link>
                                </div>
                            )
                        })
                    }
                </div>
                <div>
                    <button className="add-category" onClick={this.onBtnClick}><span className="plus">+</span></button>
                    {this.state.isClicked &&
                        <div className="input-field">
                            <form onSubmit={this.handleSubmit}>
                                <input
                                    name="name"
                                    type="text"
                                    onChange={this.handleChange}
                                    value={this.category}
                                    className="cat-input"
                                />
                                <button type="submit" className="cat-add">Add</button>
                            </form>
                        </div>
                    }
                </div>
            </div>
        )
    }

}
const mapState = state => {
    return {
        categories: state.categories,
        username: state.user.username,
        email: state.user.email
    }
}

const mapDispatch = dispatch => {
    return {
        loadInitialData() {
            dispatch(me())
        },
        getAllCategories: () => {
            dispatch(fetchAllCategories());
        },
        postNewCategory: (name) => {
            dispatch(postCategory(name))
        }
    }
}

export default connect(mapState, mapDispatch)(UserSummary)