to = function (promise) { //global function that will help use handle promise rejections, this article talks about it http://blog.grossman.io/how-to-write-async-await-without-try-catch-blocks-in-javascript/
    return promise
        .then(data => {
            return [null, data];
        }).catch(err => [pe(err)]);
}

var years = {
    1: '2016-17',
    2: '2017-18',
    3: '2018-19',
    4: '2019-20',
    5: '2020-21',
    6: '2021-22',
    7: '2022-23'
}

var quarters = {
    1: 'Q1',
    2: 'Q2',
    3: 'Q3',
    4: 'Q4'
}

var gstFormType = {
    1: 'GSTR 1',
    2: 'GSTR 2',
    3: 'GSTR 3',
    4: 'GSTR 3B'
}

var months = {
    1: 'Jan',
    2: 'Feb',
    3: 'Mar',
    4: 'Apr',
    5: 'May',
    6: 'Jun',
    7: 'Jul',
    8: 'Aug',
    9: 'Sep',
    10: 'Oct',
    11: 'Nov',
    12: 'Dec',
    13: 'Annual'
}

var type = {
    1: 'Primary',
    2: 'Composite'
}

var gstStatus = {
    1: 'Challan Pending',
    2: 'Wrong GSTIN',
    3: 'Input Difference',
    4: 'Previous Return Pending',
    5: 'Error on Website',
    6: 'Late Fee',
    7: 'Interest',
    8: 'Any Other'
}

fy = function (fy) {
    return years[fy];
}

qr = function (q) {
    return quarters[q];
}
mnth = function (mn) {
    return months[mn];
}

gst = function (t) {
    return type[t];
}

clientData = function () {
    return {
        years: years,
        quarters: quarters,
        months: months,
        gstType: type,
        gstStatus: gstStatus,
        formType: gstFormType
    }
}

pe = require('parse-error'); //parses error so you can read error message and handle them accordingly

TE = function (err_message, log) { // TE stands for Throw Error
    if (log === true) {
        console.error(err_message);
    }

    throw new Error(err_message);
}

ReE = function (res, err, code) { // Error Web Response
    if (typeof err == 'object' && typeof err.message != 'undefined') {
        err = err.message;
    }

    if (typeof code !== 'undefined') res.statusCode = code;

    return res.json({
        success: false,
        error: err
    });
}

ReS = function (res, data, code) { // Success Web Response
    let send_data = {
        success: true
    };

    if (typeof data == 'object') {
        send_data = Object.assign(data, send_data); //merge the objects
    }

    if (typeof code !== 'undefined') res.statusCode = code;

    return res.json(send_data)
};

//This is here to handle all the uncaught promise rejections
process.on('unhandledRejection', error => {
    console.error('Uncaught Error', pe(error));
});