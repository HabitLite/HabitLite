const ADD_PERSONALITY = "ADD_PERSONALITY"

export const addPersonality = personality => {
    return {
        type: ADD_PERSONALITY,
        personality
    }
}

export default function (state = [], action) {
    switch (action.type) {
        case ADD_PERSONALITY:
            return state.concat([action.personality])
        default: return state
    }

}