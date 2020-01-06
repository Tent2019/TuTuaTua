module.exports = (sequelize, DataType) => {
    const award = sequelize.define('award', {
        detail: { type: DataType.STRING(100) }        
    })

    return award
}