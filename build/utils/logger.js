"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.error = exports.info = void 0;
exports.info = function () {
    var params = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        params[_i] = arguments[_i];
    }
    if (process.env.NODE_ENV !== 'test') {
        console.log.apply(console, params);
    }
};
exports.error = function () {
    var params = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        params[_i] = arguments[_i];
    }
    console.error.apply(console, params);
};
module.exports = {
    info: exports.info, error: exports.error
};
