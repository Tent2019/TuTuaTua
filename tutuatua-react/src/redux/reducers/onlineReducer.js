import { ONLINE_USER } from "../actions/actions"


export default function onlineReducer(user = null, action) {
    switch(action.type){
        case ONLINE_USER: 
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