const components = {
    login: {
        component: 'Login',
        url: '/login'
    },
    tutor: {
        component: 'Tutor',
        url: '/tutor'
    },
    student: {
        component: 'Student',
        url: '/student'
    }
}

export default {
    // === no admin ===/
    // admin: {
    //     routes: [...Object.values(components)]
    // },
    tutor: {
        routes: [
            components.tutor
        ],
        redirect: '/tutor'
    },
    student: {
        routes: [
            components.student
        ],
        redirect: '/student'
    },
    guest: {
        routes: [
            components.login
        ],
        redirect: '/login'
    }
}