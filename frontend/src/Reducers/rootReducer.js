
const initState = {
    user: {
        id: 0,
        username: 'anonyme',
        password: '',
        age: '',
        mail: '',
        department: ''
    }
}

const rootReducer = (state = initState, action) => {

    if ((action.type === 'USER') || (action.type === 'PROFIL')) {
        let user = state.user
        const type = action.payload

        if (action.type === 'USER') {
            user.id = type.id
            user.mail = type.mail
            user.username = type.username
            user.password = type.password
        }
        
        if (action.type === 'PROFIL') {
            user.age = type.age
            user.mail = type.mail
            user.department = type.department
        }

        return {
            ...state,
            user: user
        }
    }

    return state;
}

export default rootReducer;



