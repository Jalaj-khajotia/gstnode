'use strict';
module.exports = (sequelize, DataTypes) => {
    var Model = sequelize.define('ClientGst', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        clientInfoId: DataTypes.INTEGER,
        gstFormType: DataTypes.INTEGER,
        year: DataTypes.INTEGER,
        period: DataTypes.INTEGER,
        gststatus: DataTypes.INTEGER,
        gstpendingstatus: DataTypes.INTEGER,
        receiptDate: DataTypes.DATEONLY,
        fillingDate: DataTypes.DATEONLY,
        remark: DataTypes.STRING,
        companyid: DataTypes.INTEGER
    });


    Model.prototype.toWeb = function (pw) {
        let json = this.toJSON();
        return json;
    };

    return Model;
};