export const ADD_TUTOR = 'ADD_TUTOR';
export const ADD_STUDENT = 'ADD_STUDENT';

export function addTutor(username, password) {
    return {
        type: ADD_TUTOR,
        id: Math.round(Math.random()*1000),
        username: username,
        password: password
    }    
}

export function addStudent(username, password) {
    return {
        type: ADD_STUDENT,
        id: Math.round(Math.random()*1000),
        username: username,
        password: password
    }    
}

