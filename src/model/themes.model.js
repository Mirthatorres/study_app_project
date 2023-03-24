const { DataTypes } = require('sequelize');
const { sequelize } = require("../connection");

const ThemeModel = sequelize.define('Theme', {

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

    description: {
        type: DataTypes.STRING,
        allowNull: false
    },

    keywords: {
        type: DataTypes.STRING,
        allowNull: true
    },

    owner_user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},

{
    tableName:'themes',
    timestamps:false
});

module.exports = {
    ThemeModel
};