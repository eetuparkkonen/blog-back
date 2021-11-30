"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
require("mongoose");
const passport_google_oauth20_1 = require("passport-google-oauth20");
const userModel_1 = require("../models/userModel");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
// ottaa tiedot mitkä laittaa keksiin
passport_1.default.serializeUser((user, done) => {
    done(null, user.id);
});
passport_1.default.deserializeUser((id, done) => {
    userModel_1.UserModel.findById(id).then((user) => {
        done(null, user);
    });
});
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: process.env.clientGoogleID,
    clientSecret: process.env.clientSecret,
    callbackURL: '/auth/google/redirect',
}, (accessToken, refreshToken, profile, done) => {
    userModel_1.UserModel.findOne({ email: profile._json.email }).then((existingUser) => {
        if (existingUser) {
            // tarkistetaan löytyykö user tietokannasta, jos löytyy ei luoda uutta
            done(null, existingUser);
        }
        else {
            new userModel_1.UserModel({
                username: profile.displayName,
                email: profile._json.email,
            })
                .save()
                .then((newUser) => {
                done(null, newUser);
            });
        }
    });
}));
