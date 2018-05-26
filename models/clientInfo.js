'use strict';
module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define('ClientInfo', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    codeno: DataTypes.INTEGER,
    tradename: DataTypes.STRING,
    legalname: DataTypes.STRING,
    address: DataTypes.STRING,
    gstin: DataTypes.STRING,
    regdate: DataTypes.DATEONLY,
    dealertype: DataTypes.INTEGER,
    userid: DataTypes.INTEGER,
    password: DataTypes.STRING,
    mobile: DataTypes.INTEGER,
    emailid: DataTypes.STRING,
    ewayuserid: DataTypes.STRING,
    ewaypassword: DataTypes.STRING,
    cancellationdate: DataTypes.DATEONLY,
    remark: DataTypes.STRING,
    companyid: DataTypes.INTEGER
  });

  // Model.associate = function (models) {
  //   this.Users = this.belongsToMany(models.User, {
  //     through: 'UserCompany'
  //   });
  // };

  Model.prototype.toWeb = function (pw) {
    let json = this.toJSON();
    return json;
  };

  return Model;
};