import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {fetchAllCategories} from '../store/categories'
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const styles = {
    customWidth: {
      width: 347,
      marginTop: 87,
      marginRight: 18,
      marginBottom: 55,
      marginLeft: 155,
    }
  };

/**
 * COMPONENT
 */
class Categories extends Component {

    constructor(props){
        super(props)
        this.state = {
            selectedCategory: '', //category ID
            value: null
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
        return (
            <div className="categories">
                <SelectField className="select-field"
                    style={styles.customWidth}
                    floatingLabelText="Select a category"
                    value={this.state.value}
                    onChange={this.handleChange}
                    iconStyle={{
                      fill: '#8099a0'
                    }}
                    >
                    <MenuItem value={null} primaryText="" />
                    {
                            categories.map(category => {
                                return (
                                    <MenuItem key={category.id} value={category.id}primaryText={category.name} />
                                )
                            })
                    }
                </SelectField>
                {/* <select onChange={this.handleChange} name="selectedCategory">
                    <option>Select a category</option>
                    {
                            categories.map(category => {
                                return (
                                    <option key={category.id} value={category.id}>{category.name}</option>
                                )
                            })
                        }
                </select> */}
            </div>
        )}
    }

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
