import { combineReducers } from 'redux'
import tutorsReducer from './tutorsReducer'
import studentReducer from './studentsReducer'

export default combineReducers({   
    tutors: tutorsReducer,
    student: studentReducer
})