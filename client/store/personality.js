import axios from 'axios'
const ADD_PERSONALITY = "ADD_PERSONALITY"

export const addPersonality = insight => {
    return {
        type: ADD_PERSONALITY,
        insight
    }
}

export const postPersonality = (userId, insight) => {
    return dispatch => {
        return axios.post(`/api/personality/profile/${userId}`, insight)
            .then(res => {
                console.log("Getting categories", res.data)
                return res.data
            })
            .then(newInsight => {

                dispatch(addPersonality(newInsight));

            })

            .catch(console.error);
    };
}

export default function reducer(state = [], action) {
    switch (action.type) {
        case ADD_PERSONALITY:
            return [...state, action.insight]
        default:
            return state
    }
}