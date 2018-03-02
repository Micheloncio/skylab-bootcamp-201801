/** 
 * User (model)
 * 
 * @version 1.0.0
 */
class User {
    constructor() {
        let count = 0
        for (const prop of User.model)
            this[prop] = arguments[count++]
    }

    copy(user) {
        for (const prop of User.model)
            this[prop] = user[prop]
    }

    matches(user) {
        return User.match(this, user)
    }
}

User.match = function(user, vs) {
    let matches = true

    for (const prop of User.model) {
        const value = vs[prop]

        if (typeof value !== 'undefined')
            matches = matches && user[prop] === value 

    }

    return matches
}

User.model = ['id', 'name', 'surname', 'email', 'username', 'password']

User.validate = function (user) {
    if (typeof user !== 'object' || !user instanceof User) throw Error(`user cannot be ${user}`)

    for (let prop of User.model) {
        value = user[prop]

        if (prop !== 'id' && (typeof value !== 'string' || !value.trim().length)) throw Error(`${prop} cannot be ${value}`)
    }
}

User.validateId = function(id) {
    if (typeof id !== 'string' && !id.trim().length) throw Error(`id cannot be ${id}`)
}

User.clone = function (user) {
    const _user = new User()

    _user.copy(user)

    return _user
}

module.exports = User

// const user = new User(1,2,3,4,5,6)

// console.log(User.clone(user))