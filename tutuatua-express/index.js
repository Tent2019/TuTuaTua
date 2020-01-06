const db = require('./models')
const passport = require('passport')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

const userService = require('./services/user')
const reserveService = require('./services/reserve')
const commentService = require('./services/comment')

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(passport.initialize())
require('./config/passport/passport')

db.sequelize.sync({ force: false }).then(() => {
    userService(app, db)
    reserveService(app, db)
    commentService(app, db)

    app.listen(8080, () => console.log('Server is running on port 8080'))
})