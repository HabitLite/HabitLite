import axios from 'axios'
const ADD_PERSONALITY = "ADD_PERSONALITY"

const currentP = [];
export function addPersonality(insight) {
    return { type: ADD_PERSONALITY, insight }
}

export const postPersonality = (userId, insight) => {
    return dispatch => {
        return axios.post(`/api/personality/profile/${userId}`, { insight })
            .then(res => {
                console.log('POSTED SUCCESSFULLY ?!?!?!', res)
                dispatch(addPersonality(res.data))
            })
            .catch(err => console.log(err))
    }
}


//             .then(res => res.data)
//             .then(newInsight => {
//                 dispatch(addPersonality(newInsight));
//             })
//             .catch(console.error);
//     };
// }

export default function reducer(state = currentP, action) {
    switch (action.type) {
        case ADD_PERSONALITY:
            return state.concat([action.insight])
        default:
            return state
    }
}