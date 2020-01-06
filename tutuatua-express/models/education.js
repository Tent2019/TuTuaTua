module.exports = (sequelize, DataType) => {
    const education = sequelize.define('education', {
        detail: { type: DataType.STRING(100) }        
    })

    return education
}