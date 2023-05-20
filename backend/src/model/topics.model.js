const { DataTypes } = require('sequelize');
const { sequelize } = require("../connection");

const TopicModel = sequelize.define('Topic', {

    id: {
        type: DataTypes.INTEGER,
        allownNull: false,
        primaryKey: true,
        autoIncrement: true
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    create_date: {
        type: DataTypes.TIME,
        allowNull: true
    },

    order: {
        type: DataTypes.INTEGER,
        allowNull: true
    },

    priority: {
        type: DataTypes.INTEGER,
        allowNull: true
    },

    color: {
        type: DataTypes.STRING,
        allowNull: true
    },

    owner_user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},

{
    tableName:'topics',
    timestamps:false
});

module.exports = {
    TopicModel
};