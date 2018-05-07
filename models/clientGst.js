'use strict';
module.exports = (sequelize, DataTypes) => {
    var Model = sequelize.define('ClientGst', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        clientid: DataTypes.INTEGER,
        year: DataTypes.INTEGER,
        period: DataTypes.INTEGER,
        gsttypeid: DataTypes.INTEGER,
        gststatus: DataTypes.INTEGER,
        remark: DataTypes.STRING
    });


    Model.prototype.toWeb = function (pw) {
        let json = this.toJSON();
        return json;
    };

    return Model;
};