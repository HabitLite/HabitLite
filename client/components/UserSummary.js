import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { User, Progress } from './index'
import {fetchAllCategories, postCategory} from '../store/categories'

const divStyle = {
    marginTop: '590px',    
};


      
// function ChannelList (props)
// const UserSummaryForm = (props) =>{

// // class UserSummary extends Component {
//     const { handleClick, handleChange, name} = props

//     return (
//         <div>
//             {/* <button className="add-category" onClick={onBtnClick}>+</button>   */}
//                     {/* {isClicked &&  */}
//                     <div className="input-field">
//                         <form onClick={handleClick}>
//                             <input
//                                 name="category"
//                                 type="text"
//                                 onChange={handleChange}
//                                 value={category}
//                             />
//                             <button>Add</button>
//                         </form>
//                         </div>
//                     {/* } */}
//         </div>
//     )
// }
    
class UserSummary extends Component {
    state = {
        name: '',
        isClicked: false
    }
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         name: '',
    //         // isClicked: false
    //     }
    //     // this.onBtnClick = this.onBtnClick.bind(this);
    //     this.handleChange = this.handleChange.bind(this);
    //     this.handleSubmit = this.handleSubmit.bind(this);
    // }
    onBtnClick = (e) => {
        // e.preventDefault();
        this.setState({isClicked: true})
    }
    handleChange = (event) => {     
        this.setState({ [event.target.name]: event.target.value })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const name = this.state.name
        this.props.postNewCategory({name})
        // const name = this.state.name;
        // this.props.postNewCategory(name)
        this.setState({ name: ''})
    }
    componentDidMount(){
        this.props.getAllCategories();    
    }
    
    render() {
        // console.log('categories Data: ', this.props.categories)
        // // console.log('user USER ID ' , this.props.user)
        const categories = this.props.categories

        // to={`/add`} params={{ test: category.id }}
        return (
            <div className="summary-container">
                <h2 className="category-list">Your Summary</h2>
                <div className="container">
                {
                    categories.map((category, i) => {
                        return (
                            <div className="category-name" style={divStyle} key={i}>
                                <Link to={{pathname: '/single', state: { name: category.name}}} className='category' key={category.id}>
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
                    <button className="add-category" onClick={this.onBtnClick}>+</button>  
                            {this.state.isClicked && 
                            <div className="input-field">
                                <form onSubmit={this.handleSubmit}>
                                    <input
                                        name="name"
                                        type="text"
                                        onChange={this.handleChange}
                                        value={this.category}
                                    />
                                    <button type="submit">Add</button>
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
      user: state.user.id,
      email: state.user.email
    }
  }
  
  const mapDispatch = dispatch => {
   return {
     getAllCategories: () => {
       dispatch(fetchAllCategories());
     },
     postNewCategory: (name) => {
        dispatch(postCategory(name))
     }
    }
  }
  
  export default connect(mapState, mapDispatch)(UserSummary)




/* *** COMPONENT *** */
// class UserSummary extends Component{

//     constructor(props){
//         super(props)
//     }
//     componentDidMount() {
//         this.props.getAllCategories();
//     }
//     render() {
        
//         return (
//             <div className="main-page">

//             <h3 className="welcome">Welcome, </h3>
//             {/* <User />
//             <Categories />
//             <Habits /> */}
//             {/* <Progress /> */}
//             </div>
//         )
//     }
// }

// /* *** CONTAINER *** */
// const mapState = (state) => {
//   return {
//     username: state.user.username,
//     selectedUser: state.user.id
//   }
// }
// const mapDispatch = (dispatch) => {
//     return {
//       getAllCategories: () => {
//          dispatch(fetchAllCategories());
//       }
//     }
//  }

// export default connect(mapState, mapDispatch)(UserSummary)

