module.exports = (sequelize, DataType) => {

    const reserve = sequelize.define('reserve', {
        id: { type: DataType.INTEGER, primaryKey: true },
        date: { type: DataType.STRING(10) },
        timeRange: { type: DataType.STRING(20) },               
        price: { type: DataType.INTEGER },
        status: { type: DataType.BOOLEAN },
        studentId: { type: DataType.INTEGER }
    })

    reserve.associate = (models) => {
        reserve.belongsTo(models.user, {foreignKey:'tutorId'})        
    }

    return reserve
}