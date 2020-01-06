const passport = require('passport')

module.exports = (app, db) => {

    app.get('/getSchedule', passport.authenticate('jwt', { session: false }),
        async (req, res) => {
            try {
                let result = await db.reserve.findAll(
                    {
                        where: { tutorId: req.user.id },
                        attributes: ['id','date','timeRange','price','status','tutorId','studentId']
                    }
                )    
                res.status(200).send(result)
            } catch (error) {
                res.status(400).send({ message: error.message })
            }            
        }
    )

    app.get('/getScheduleBySelectTutor/:id', passport.authenticate('jwt', { session: false }),
        async (req, res) => {
            try {
                let result = await db.reserve.findAll(
                    {
                        where: { tutorId: req.params.id },
                        attributes: ['id','date','timeRange','price','status','tutorId','studentId']
                    }
                )    
                res.status(200).send(result)
            } catch (error) {
                res.status(400).send({ message: error.message })
            }            
        }
    )

    app.get('/getScheduleByStudentId', passport.authenticate('jwt', { session: false }),
        async (req, res) => {
            try {
                let result = await db.reserve.findAll(
                    {
                        where: { studentId: req.user.id },
                        attributes: ['id','date','timeRange','price','status'],
                        include: [{
                            model:db.user,
                            attributes: ['username','telephone','image'] 
                        }]                        
                    }
                )    
                res.status(200).send(result)
            } catch (error) {
                res.status(400).send({ message: error.message })
            }            
        }
    )

    app.get('/getStudent/:id', passport.authenticate('jwt', { session: false }),
        async (req, res) => {
            try {
                let result = await db.user.findOne(
                    {
                        where: { id: req.params.id},
                        attributes: ['username','telephone','image'],
                        include: [{ model:db.education, attributes: ['detail'] }]
                    }
                )
                res.status(200).send(result)
            } catch (error) {
                res.status(400).send({ message: error.message })
            }
        }
    )

    app.post('/addSchedule/:id', passport.authenticate('jwt', { session: false }),
        async (req, res) => {
            try {
                let result = await db.reserve.create({
                    id: req.params.id,
                    date: req.body.date,
                    timeRange: req.body.timeRange,
                    price: req.body.price,
                    status: req.body.status,
                    tutorId: req.user.id
                })    
                console.log(result)
                res.status(201).send(result)
            } catch (error) {
                res.status(400).send({ message: error.message })
            }                        
        }
    )

    app.delete('/deleteSchedule/:id', passport.authenticate('jwt', { session: false }),
        async (req, res) => {
            try {
                let targetReserve = await db.reserve.findOne({ 
                    where: {id: req.params.id, tutorId: req.user.id}
                })   
                if (!targetReserve) {
                    res.status(400).send({ message: "reserve is not found" })
                } else {
                    targetReserve.destroy()
                    res.status(200).json({ message: "success" })
                }
            } catch (error) {
                res.status(400).send({ message: error.message })
            }                        
        }
    )

    app.put('/reserveSchedule/:id', passport.authenticate('jwt', { session: false }),
        async (req, res) => {
            try {
                let targetReserve = await db.reserve.findOne({ where: {id: req.params.id} })   
                console.log(targetReserve)
                if (!targetReserve) {
                    res.status(400).send({ message: "reserve is not found" })
                } else {
                    targetReserve.update({ status: true, studentId: req.user.id })
                    res.status(200).json({ message: "success" })
                }
            } catch (error) {
                res.status(400).send({ message: error.message })
            }                        
        }
    )

}