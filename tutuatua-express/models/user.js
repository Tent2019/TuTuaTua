module.exports = (sequelize, DataType) => {
    const user = sequelize.define('user', {
        username: { type: DataType.STRING(255) },
        password: { type: DataType.STRING(255) },        
        role: { type: DataType.ENUM('tutor', 'student')},
        telephone: { type: DataType.STRING(20) },
        balance: { type: DataType.INTEGER },
        image: { type: DataType.STRING(500) }
    })

    user.associate = (models) => {
        user.hasMany(models.skill)    
        user.hasMany(models.education)
        user.hasMany(models.award)   
        user.hasMany(models.reserve, {foreignKey:'tutorId'})
        user.hasMany(models.comment, {foreignKey:'studentId'})        
    }

    return user
}

