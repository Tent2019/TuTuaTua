import { ADD_TUTOR } from "../actions/actions";

export default function tutorsReducer(tutors=[], action) {
    switch(action.type){
        case ADD_TUTOR: 
            return [...tutors, {
                id: action.id,
                username: action.username,
                password: action.password,
                usertypes: 'Tutor'
            }]
        default: 
            return tutors
    }
}