"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuthentication = void 0;
const checkAuthentication = (req, res, next) => {
    if (req.isAuthenticated()) {
        //req.isAuthenticated() will return true if user is logged in
        console.log('you are authenticated, in checkAuthentication');
        next();
    }
    else {
        console.log('you are not authenticated');
        res.status(401).send('You are not authenticated');
    }
};
exports.checkAuthentication = checkAuthentication;
