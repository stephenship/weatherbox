'use strict';
const moment = require('moment');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Weather extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Weather.init({
    city: DataTypes.STRING,
    time: {
      type: DataTypes.DATE,
      get() {
        // only want the time
        return moment(this.getDataValue('time')).format('HH:mm');
      },
      set(value) {
        // time only
        this.setDataValue('time', moment(value).format());      
      }
    },
    temperature: DataTypes.DOUBLE,
  }, {
    sequelize,
    modelName: 'Weather',
    tableName: 'tr_weathers',
  });
  return Weather;
};