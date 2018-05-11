import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios'
import quiz from '../../script/quiz.js'
import { postPersonality } from '../store/personality'

const styles = {
    customWidth: {
        width: 10000,
    },
    margin: 12,
};

class Personality extends Component {
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
        // let index = event.target.name
        // this.state.insight.index = event.target.value
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({ insight: this.state.q1 + "," + this.state.q2 + "," + this.state.q3 + "," })
        console.log('INSIGHTS', this.state)
        const insight = this.state.q1
        const userId = this.props.match.params.userId
        this.props.postNewPersonality(userId, insight)
        this.setState({ q1: '' })
    }

    render() {
        console.log("inside personality and this is the STATE ", this.state)
        console.log("PROPS ", this.props.match.params.userId)

        return (
            <div>
                <form onSubmit={this.handleSubmit} className='form'>
                    {
                        quiz.map((quizContent, idx) => {
                            // this.state.insight+quizContent.question
                            return (
                                <span key={idx}>

                                    <h3 >{quizContent.question}</h3>
                                    {/* {this.state.insight.push(quizContent.question)} */}
                                    {/* {console.log("question number", quizContent.qnumber)} */}
                                    <RadioButtonGroup name={quizContent.qnumber} defaultSelected="not_light" onChange={this.handleChange}>

                                        {quizContent.answers.map((ans, id) => {
                                            return (
                                                <RadioButton key={id}
                                                    value={quizContent.question + ans.content}
                                                    label={ans.content}
                                                    style={styles.radioButton}
                                                />

                                            )
                                            // { this.state.insight + event.target.value }
                                        })
                                        }

                                    </RadioButtonGroup>
                                </span>
                            )
                        })
                    }

                    <button>Submit</button>
                </form>
            </div>
        )

    }
}


const mapState = state => {
    return {
        user: state.user.id
    }
}

const mapDispatch = dispatch => {
    return {
        postNewPersonality: (userId, insight) => {
            dispatch(postPersonality(userId, insight))
        }
    }
}


export default connect(mapState, mapDispatch)(Personality)