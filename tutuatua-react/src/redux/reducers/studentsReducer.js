import { ADD_STUDENT } from "../actions/actions";

export default function studentsReducer(students=[], action) {
    switch(action.type){
        case ADD_STUDENT: 
            return [...students, {
                id: action.id,
                username: action.username,
                password: action.password,
                usertypes: 'Student'
            }]
        default: 
            return students
    }
}