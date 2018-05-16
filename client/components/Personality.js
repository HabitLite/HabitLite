import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios'
import defaultquiz from '../../script/quiz.js'
import { postPersonality } from '../store'
import { Link } from 'react-router-dom';

const styles = {
    customWidth: {
        width: 10000,
    },
    margin: 12,
};

class Personality extends Component {
    state = {
        sentences: []
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log('paragraph', this.paragraph)
        const userId = this.props.match.params.userId
        const insight = this.paragraph
        this.props.postNewPersonality(userId, insight)
        this.setState({ sentences: [] })
        this.props.history.push('/home')
    }

    get paragraph() {
        return this.state.sentences.filter(x => x).join(". ")
    }

    handleQuestion = (idx) => (event) => {
        const sentences = [...this.state.sentences]
        sentences[idx] = event.target.value
        this.setState({ sentences })
    }

    render() {
        console.log("inside personality and this is the STATE ", this.state)
        console.log("PROPS ", this.props.match.params.userId)
        const { quiz = defaultquiz } = this.props
        return (
            <div className="quiz-wrapper">
                <h1 className="quiz-header">Fill out the quiz to personalize your motivator!</h1>
                <form onSubmit={this.handleSubmit} className='form'>
                    {
                        quiz.map((question, idx) => <Question key={question.question} {...question} onChange={this.handleQuestion(idx)} />)
                    }

                    <input type="submit" className="submit-quiz" />

                </form>
            </div>
        )
    }
}

const Question = ({ question, answers, onChange }) =>
    <React.Fragment>
        <h3 className="question">{question}: </h3>
        <RadioButtonGroup defaultSelected="not_light" onChange={onChange}>{
            answers.map((ans, id) =>
                <RadioButton key={ans.content} className="radio"
                    value={question + ans.content}
                    label={ans.content}
                    style={styles.radioButton}
                />)
        }</RadioButtonGroup>
    </React.Fragment>




const mapState = state => {
    return {
        user: state.user.id,
        personality: state.personality
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