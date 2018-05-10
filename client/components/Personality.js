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
    }

    render() {
        console.log("inside personality")
        return (
            <div>
                {/* <form onSubmit={this.handleSubmit} className='form'> */}
                {
                    quiz.map((quizContent, idx) => {
                        return (
                            <div>

                                <h3 key={idx}>{quizContent.question}</h3>
                                <div>
                                    {quizContent.answers.map((ans, idx) => {
                                        return (
                                            <RadioButtonGroup name="q1" defaultSelected="not_light" onChange={this.handleChange}>

                                                <RadioButton key={idx}
                                                    value={ans.content}
                                                    label={ans.content}
                                                    style={styles.radioButton} />
                                            </RadioButtonGroup>
                                            // {/* <li key={idx}>{ans.content}</li> */}
                                        )

                                    })
                                    }
                                </div>
                            </div>
                        )

                    })
                }
                {/* <h3>I rather: </h3>
                <RadioButtonGroup name="q1" defaultSelected="not_light" onChange={this.handleChange}>

                    <RadioButton
                        value="Do Yoga"
                        label="Do Yoga"
                        style={styles.radioButton}

                    /> */}
                {/* </form> */}
            </div>
        )

    }
}