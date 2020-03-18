const db = require('./db');
const Sequelize = require('sequelize');
let wx_user = db.define('wx_user',{
        id:{
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey:true,
            comment:"主键"
        },
        wx_user:{
            type:Sequelize.STRING,
        },
        wx_img:{
            type:Sequelize.STRING
        },
        visitTime:{
            type:Sequelize.STRING
        },
        status:{
            type:Sequelize.INTEGER,
            default:1,
        },
        saleId:{
            type:Sequelize.STRING
        }
    },
    {
        timestamps: false,
        freezeTableName: true
    }

)
module.exports = wx_user;
