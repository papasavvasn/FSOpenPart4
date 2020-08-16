"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenExtractor = void 0;
var getTokenFrom = function (request) {
    var authorization = request.get('authorization');
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        return authorization.substring(7);
    }
    return null;
};
exports.tokenExtractor = function (req, res, next) {
    // put the token to the req object
    // so that all the next requests are authenticated
    req.token = getTokenFrom(req);
    next();
};
