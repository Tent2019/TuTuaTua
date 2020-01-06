module.exports = (sequelize, DataType) => {
    const skill = sequelize.define('skill', {
        detail: { type: DataType.STRING(100) }        
    })

    return skill
}