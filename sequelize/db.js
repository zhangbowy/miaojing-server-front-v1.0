const Sequelize = require('sequelize');

var sequelize = new Sequelize(
    'miaojing',
    'miaojing',
    '12314',
    {
        host: '47.100.37.157',
        dialect: 'mysql',
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        },
});


module.exports = sequelize;
