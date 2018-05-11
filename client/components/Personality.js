import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import Checkbox from 'material-ui/Checkbox';
import Toggle from 'material-ui/Toggle';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios'
import quiz from '../../script/quiz.js'

const styles = {
    customWidth: {
        width: 10000,
    },
    margin: 12,
};

export default class Personality extends Component {
    constructor(props) {
        super(props);
        this.state = {
            q1: '',
            q2: '',
            q3: '',
            q4: '',
            q5: '',
            q6: '',
            q7: '',
            q8: '',
            q9: '',
            q10: '',
            q11: '',
        }
    }

    handleChange = (event) => {
        console.log('!!!', event.target.name)
        this.setState({ [event.target.name]: event.target.value })
    }

    render() {
        console.log("inside personality and this is the STATE ", this.state)
        return (
            <div>
                <form onSubmit={this.handleSubmit} className='form'>
                    {
                        quiz.map((quizContent, idx) => {
                            return (
                                <span key={idx}>

                                    <h3 >{quizContent.question}</h3>
                                    {/* {console.log("question number", quizContent.qnumber)} */}
                                    <RadioButtonGroup name={quizContent.qnumber} defaultSelected="not_light" onChange={this.handleChange}>

                                        {quizContent.answers.map((ans, id) => {
                                            return (
                                                <RadioButton key={id}
                                                    value={ans.content}
                                                    label={ans.content}
                                                    style={styles.radioButton}
                                                />

                                            )
                                        })
                                        }

                                    </RadioButtonGroup>
                                </span>
                            )
                        })
                    }
                </form>
            </div>
        )

    }
}


{/* <div>
    <form onSubmit={this.handleSubmit} className='form'>

        <h3>I rather: </h3>
        <RadioButtonGroup name="q1" defaultSelected="not_light" onChange={this.handleChange}>

            <RadioButton
                value="Do Yoga"
                label="Do Yoga"
                style={styles.radioButton}

            />
            
        </RadioButtonGroup> */}