const passport = require('passport')
const jwt = require('jsonwebtoken')
const jwtOptions = require('../config/passport/passport')

module.exports = (app, db) => {

    app.post('/registerUser', (req, res) => {
        passport.authenticate('register', async (err, user, info) => {
            if (err) {
                console.error(err)
            }
            if (info) {
                console.error(info.message)
                res.status(403).send(info.message)
            } else {
                try {
                    await user.update({ role: req.body.role })    
                    console.log('user created in db')
                    res.status(200).send({ message: 'user created' })
                } catch (err) {
                    console.log(err)
                    res.status(400).send({ message: err.message })
                }                
            }
        })(req,res)
    })

    app.post('/loginUser', (req,res) => {
        passport.authenticate('login', (err, user, info) => {
            if (err) {
                console.error(err)
            }
            if (info) {
                console.error(info.message)
                if (info.message === 'username or password is incorrect.') {
                    res.status(401).send({ message: info.message })
                } else {
                    res.status(400).send( info.message )
                }
            } else {
                const token = jwt.sign(
                    { 
                        id: user.id, 
                        role: user.role
                    }, 
                    jwtOptions.secretOrKey, 
                    { expiresIn: 3600 }
                )
                res.status(200).send({
                    auth: true,
                    token,
                    message: 'user found & logged in'
                })           
            }
        })(req,res)
    })

    app.get('/getProfile', passport.authenticate('jwt',{session: false}),
        async (req,res) => {
            try {
                let targetUser = await db.user.findOne(
                    { 
                        where: { id: req.user.id }, 
                        attributes: ['username','role','telephone','balance','image'],
                        include: [
                            { model: db.skill, attributes: ['id','detail'] },
                            { model: db.education, attributes: ['id','detail'] },
                            { model: db.award, attributes: ['id','detail'] }
                        ]
                    }
                )
                if (!targetUser) {
                    res.status(404).send({ message: "user is not found" })
                } else {
                    res.status(200).json(targetUser)
                }
            } catch (err) {
                res.status(400).send({ message: err.message })
            }            
        }  
    )

    app.put('/updateProfile', passport.authenticate('jwt',{session: false}),
        async (req, res) => {
                                   
            let targetUser = await db.user.findOne({ where: { id: req.user.id } })                                        
            if (!targetUser) {
                res.status(400).send({ message: "user is not found" })
            } else {
                targetUser.update({
                    telephone: req.body.telephone,
                    image: req.body.image
                })
                res.status(200).json({ message: "update success" })
            }   
            
            if (targetUser.role === 'tutor') {
                let skillList = []
                req.body.skills.map(skill => skillList.push(skill.detail))
                await db.skill.destroy({ where: {userId: req.user.id} })
                skillList.map(skill => db.skill.create({ detail: skill, userId: req.user.id }))

                let awardList = []
                req.body.awards.map(award => awardList.push(award.detail))
                await db.award.destroy({ where: {userId: req.user.id} })
                awardList.map(award => db.award.create({ detail: award, userId: req.user.id }))
            }            
            
            let eduList = []
            req.body.edus.map(edu => eduList.push(edu.detail))
            await db.education.destroy({ where: {userId: req.user.id} })
            eduList.map(edu => db.education.create({ detail: edu, userId: req.user.id }))
            
        }
    )
    
    app.get('/getTutors', passport.authenticate('jwt',{session: false}),
        async (req,res) => {
            try {
                let tutors = await db.user.findAll(
                    { 
                        where: {role: 'tutor'},
                        attributes: ['id','username','telephone','image'],
                        include: [
                            { model: db.skill, attributes: ['id','detail'] },
                            { model: db.education, attributes: ['id','detail'] },
                            { model: db.award, attributes: ['id','detail'] }
                        ]                        
                    }
                )
                if (!tutors) {
                    res.status(404).send({ message: "tutors are not found" })
                } else {
                    res.status(200).json(tutors)
                }
            } catch (err) {
                res.status(400).send({ message: err.message })
            }            
        }  
    )

    // === test ===
    app.get('/protected-route', passport.authenticate('jwt', {session: false}),
        (req,res) => {res.status(200).send(req.user)}
    )

}


