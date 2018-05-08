import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { User, Progress } from './index'
import {fetchAllCategories} from '../store/categories'

const divStyle = {
    marginTop: '590px',    
};


class UserSummary extends Component {
    
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        this.props.getAllCategories();
        
    }
    // handleClick(val){
    //     console.log('VALUE' ,val)
    // }
    render() {
        console.log('categories Data: ', this.props.categories)
        // // console.log('user USER ID ' , this.props.user)
        const categories = this.props.categories
        const test = 'lol';

        // to={`/add`} params={{ test: category.id }}
        return (
            <div className="summary-container">
                <h2 className="category-list">Your Summary</h2>
                <div className="container">
                {
                    categories.map((category, i) => {
                        return (
                            <div className="category-name" style={divStyle} key={category.id}>
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
            </div>
        )
    }
}
//     margin-top: 500px;
// display: inline-flex;
// margin-left: 90px;
// flex-wrap: wrap;
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

