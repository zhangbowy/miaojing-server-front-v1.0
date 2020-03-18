const db = require('./db');
const Sequelize = require('sequelize');

let class1 = db.define('domain',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey:true,
        comment:"主键"
    },
    domain:{
        type:Sequelize.STRING
    },
    short_url:{
        type:Sequelize.STRING
    },
    child:{
        type:Sequelize.STRING
    }
},
{
    timestamps: false,
    freezeTableName: true
}

)
module.exports = class1;
