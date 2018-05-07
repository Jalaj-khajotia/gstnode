to = function (promise) { //global function that will help use handle promise rejections, this article talks about it http://blog.grossman.io/how-to-write-async-await-without-try-catch-blocks-in-javascript/
    return promise
        .then(data => {
            return [null, data];
        }).catch(err => [pe(err)]);
}

var years = {
    10: '2009-10',
    11: '2010-11',
    12: '2011-12',
    13: '2012-13',
    14: '2013-14',
    15: '2014-15',
    16: '2015-16',
    17: '2016-17',
    18: '2017-18',
    19: '2018-19'
}

var quarters = {
    1: 'q1',
    2: 'q2',
    3: 'q3',
    4: 'q4'
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
    12: 'Dec'
}

var type = {
    1: 'Primary',
    2: 'Composite'
}

var gstStatus = {
    1:'Completed',
    2:'Pending',
    3:'Error'
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
        gstStatus:gstStatus
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