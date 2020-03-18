const db = require('./db');
const Sequelize = require('sequelize');
let error_log = db.define('error_log',{
        id:{
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey:true,
            comment:"主键"
        },
        inter_face:{
            type:Sequelize.STRING,
        },
        url:{
            type:Sequelize.STRING
        },
        content:{
            type:Sequelize.STRING
        }
    },
    {
        timestamps: false,
        freezeTableName: true
    }

)
module.exports = error_log;
