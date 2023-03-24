const { DataTypes } = require('sequelize');
const { sequelize } = require("../connection");

const UserModel = sequelize.define('User', {

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

    last_name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    avatar: {
        type: DataTypes.STRING,
        allowNull: true
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false
    },

    deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
},

{
    tableName:'users',
    timestamps:false
});

module.exports = {
    UserModel
};