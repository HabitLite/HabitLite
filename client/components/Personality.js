import React, { Component } from 'react';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
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
            insight: ''
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
                            this.state.insight + quizContent.question
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
                                            { this.state.insight + event.target.value }
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
