import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {fetchAllCategories, fetchHabits} from '../store'
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import history from '../history';

const styles = {
    customWidth: {
      width: 347,
      marginTop: 87,
      marginRight: 18,
      marginBottom: 55,
      marginLeft: 99,
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
        }
        // this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount() {
        this.props.getAllCategories();
    }
    
    
    render() {
        const categories = this.props.categories;
        const listOpen = this.props
        // console.log('State: ', listOpen)
        // console.log('selected categ: ', this.state.selectedCategory)
        // console.log("props ", this.props)
        return (
            <div className="categories">
                {/* <SelectField className="select-field"
                    style={styles.customWidth}
                    floatingLabelText="Select a category"
                    value={this.state.value}
                    onChange={this.handleChange}
                    name="selectedCategory"
                    iconStyle={{
                      fill: '#8099a0'
                    }}
                    >
                    {
                        categories.map(category => {
                            // console.log('Category ', category)
                            return (
                                <MenuItem key={category.id} value={category.id} primaryText={category.name} />
                            )
                        })
                    }
                </SelectField> */}
                <select onChange={this.props.handleChange.bind(this)} name="selectedCategory">
                    {/* <option>Select a category</option> */}
                    {
                        categories.map(category => {
                            return (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            )
                        })
                    }
                </select>
            </div>
        )}
    }

const mapState = (state) => {
    return {
      categories: state.categories,
    }
}
  
const mapDispatch = (dispatch, ownProps) => {
    // console.log('useId, catId ', ownProps.props.match.params.userId, ownProps.props.match.params.categoryId)
    // console.log('Ownprops ', ownProps)
    // console.log('History ', ownProps.props.history)

    return {
        getAllCategories: () => {
            dispatch(fetchAllCategories());
        },
        handleChange(event) {
            this.setState({ [event.target.name]: event.target.value })
            
            dispatch(fetchHabits(ownProps.props.match.params.userId, Number(this.state.selectedCategory), ownProps.props.history))
           
        }
    }
}
export default connect(mapState, mapDispatch)(Categories)
