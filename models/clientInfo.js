'use strict';
module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define('ClientInfo', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    clientid: DataTypes.INTEGER,
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    mobile: DataTypes.INTEGER,
    gstid: DataTypes.STRING,
    gstno: DataTypes.STRING,
    emailid: DataTypes.STRING,
    ewaybillid: DataTypes.STRING,
    ewaypassword: DataTypes.STRING
  });

  Model.associate = function (models) {
    this.Users = this.belongsToMany(models.User, {
      through: 'UserCompany'
    });
  };

  Model.prototype.toWeb = function (pw) {
    let json = this.toJSON();
    return json;
  };

  return Model;
};