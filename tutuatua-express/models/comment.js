module.exports = (sequelize, DataType) => {

    const comment = sequelize.define('comment', {
        text: { type: DataType.STRING(200) },
        tutorId: { type: DataType.INTEGER }
    })

    comment.associate = (models) => {
        comment.belongsTo(models.user, {foreignKey:'studentId'})        
    }

    return comment
}