const passport = require('passport')

module.exports = (app, db) => {

    app.post('/createComment/:id', passport.authenticate('jwt', { session: false }),
        async (req, res) => {
            try {
                let result = await db.comment.create({
                    text: req.body.text,
                    tutorId: req.params.id,
                    studentId: req.user.id
                })
                res.status(201).send(result)
            } catch (error) {
                res.status(400).send({ message: error.message })
            }           
        }
    )

    app.get('/getComment', passport.authenticate('jwt', { session: false }),
        async (req, res) => {
            try {
                let result = await db.comment.findAll(
                    {
                        where: { tutorId: req.user.id },
                        attributes: ['text'],
                        include: [{
                            model: db.user,
                            attributes: ['username','image']
                        }]
                    }
                )
                res.status(200).send(result)
            } catch (error) {
                res.status(400).send({ message: error.message })
            }
        }
    )

}