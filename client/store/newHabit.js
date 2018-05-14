import axios from 'axios';

const ADD_HABIT = 'ADD_HABIT';
export function addHabit(habit) {
    return { type: ADD_HABIT, habit }
}

export const postHabit = (userId, categoryId, habit) => {
    return dispatch => {
        return axios.post(`api/habits/${userId}/${categoryId}`, habit)
            .then(habit => {
                console.log("INSIDE POST THUNK", habit)
                dispatch(addHabit(habit))
            })
            .catch(err => console.log(err))
    }
}


export default function (state = '', action) {
    switch (action.type) {

        case ADD_HABIT:
            return action.habit
        default:
            return state;
    }
}