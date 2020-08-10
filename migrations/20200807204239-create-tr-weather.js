'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('tr_weathers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      city: {
        primaryKey: true,
        type: Sequelize.STRING,
        required: true
      },
      time: {
        primaryKey: true,
        type: Sequelize.DATE,
        required: true,
        defaultValue: new Date()
      },
      temperature: {
        primaryKey: true,
        type: Sequelize.DOUBLE,
        required: true,
        defaultValue: 0.0
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('tr_weathers');
  }
};