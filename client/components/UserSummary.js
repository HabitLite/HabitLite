import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Progress } from './index'
import { fetchAllCategories, postCategory, fetchUserCategories } from '../store/categories'
import { fetchPersonality } from '../store/personality'
import { me } from '../store'
import { VictoryPie, VictoryAnimation, VictoryLabel } from 'victory'

const divStyle = {
    marginTop: '590px'
};

class UserSummary extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            isClicked: false,
            username: '',
            userId: '',

        }
    }
    onBtnClick = () => {
        this.setState({ isClicked: true })
    }
    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const name = this.state.name
        const userId = this.props.user.id
        this.props.postNewCategory(userId, { name })
        this.setState({ name: '' })
    }
    componentDidMount() {
        const userId = this.props.user.id
        // console.log("this.props.user", this.props.user.id)
        this.props.getAllCategories();
        this.props.loadInitialData();

        this.props.getUserPersonality(userId);
        this.props.getUserCategories(userId);
        this.props.loadInitialData()
    }

    render() {
        const categories = this.props.categories.map(cat => ({ ...cat, ...cat.category }))

        const username = this.props.username || ''
        const personality = this.props.personality
        console.log("STATE IN USER SUMMARY", this.state)
        console.log("props IN USER SUMMARY", this.props)
        console.log("categories", categories)

        return (
            <div className="summary-container">
                <h2 className="category-list">Your Summary</h2>

                <div>
                    <h4>IBM Watson Personality Insight: </h4>
                    <h5>
                        {personality[0] ? personality[0].analysis : null}
                    </h5>
                </div>


                <div className="container-progress">
                    {
                        categories.map((category, i) => {
                            return (

                                <div className="category-name" style={divStyle} key={i}>
                                    <Link to={{
                                        pathname: `/${category.userId}/${category.name}`,
                                        state: { name: category.name }
                                    }} className='category' key={category.id}>
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
        userCategories: state.user.userCategories,
        user: state.user,
        userId: state.user.id,
        personality: state.personality || '',
        allUserCategories: state.user.allUserCategories
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
        getUserCategories: (userId) => {
            dispatch(fetchUserCategories(userId));
        },
        postNewCategory: (userId, name) => {
            dispatch(postCategory(userId, name))
        },
        getUserPersonality: (userId) => {
            dispatch(fetchPersonality(userId))
        }
    }
}

export default connect(mapState, mapDispatch)(UserSummary)