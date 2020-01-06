const passport = require('passport')
const localStrategy = require('passport-local').Strategy

const env = process.env.NODE_ENV || 'development'
const config = require('../config.json')[env]
const BCRYPT_SALT_ROUNDS = config.salt_length
const bcrypt = require('bcryptjs')
const db = require('../../models')

const extractJwt = require('passport-jwt').ExtractJwt
const JWTStrategy = require('passport-jwt').Strategy

passport.use('register', new localStrategy(
    {
        usernameField: 'username',
        passwordField: 'password',
        session: false
    },
    async (username, password, done) => {
        try {
            let user = await db.user.findOne({ where: { username } })
            if (user) {
                console.log('Username already taken')
                return done(null, false, { message: 'username already taken' })
            } else {
                let salt = bcrypt.genSaltSync(BCRYPT_SALT_ROUNDS)
                let hashedPassword = bcrypt.hashSync(password, salt)
                try {
                    let user = await db.user.create({ username, password: hashedPassword })
                    console.log('user created')
                    return done(null, user)    
                } catch (err) {
                    console.error(err)
                    done(err)
                }                
            }    
        } catch (err) {
            console.log(err)
            done(err)
        }       
    }
))

let jwtOptions = {}
jwtOptions.secretOrKey = 'TuTu4Tu4'

passport.use('login', new localStrategy(
    {
        usernameField: 'username',
        passwordField: 'password',
        session: false
    },
    async (username, password, done) => {
        let user = await db.user.findOne({ where: { username } })
        if (!user) {
            return done(null, false, { message: 'username or password is incorrect.' })
        }
        bcrypt.compare(password, user.password, function(err,response) {
            if (err) {
                console.error(err)
                done(err)
            }
            if (!response) {
                return done(null, false, { message: 'username or password is incorrect.' })
            }
            console.log(`user ${user.id} is found & authenticated`)
            return done(null, user)
        })
    }
 ))

const opts = {
    jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtOptions.secretOrKey
} 

passport.use('jwt', new JWTStrategy(opts, async (jwt_payload, done) => {
    console.log({ jwt_payload })
    try {
        let user = await db.user.findOne({ where: {id: jwt_payload.id} })
        if(user) {
            console.log('user found')
            return done(null, user)    
        } else {
            console.log('user is not found')
            return done(null, false)
        }        
    } catch (error) {
        console.log('user is not found')
        done(null, false)
    }    
}))

module.exports = jwtOptions