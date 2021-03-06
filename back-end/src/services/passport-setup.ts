import passport from 'passport';
import 'mongoose';
import { Strategy } from 'passport-google-oauth20';
import { UserModel } from '../models/userModel';
import * as dotenv from 'dotenv';
dotenv.config();

// ottaa tiedot mitkä laittaa keksiin
passport.serializeUser((user: any, done) => {
	done(null, user.id);
});

passport.deserializeUser((id: string, done) => {
	UserModel.findById(id).then((user) => {
		done(null, user);
	});
});

passport.use(
	new Strategy(
		{
			clientID: <string>process.env.clientGoogleID,
			clientSecret: <string>process.env.clientSecret,
			callbackURL: '/auth/google/redirect',
		},
		(accessToken, refreshToken, profile, done) => {
			UserModel.findOne({ email: profile._json.email }).then((existingUser) => {
				if (existingUser) {
					// tarkistetaan löytyykö user tietokannasta, jos löytyy ei luoda uutta
					done(null, existingUser);
				} else {
					new UserModel({
						username: profile.displayName,
						email: profile._json.email,
					})
						.save()
						.then((newUser) => {
							done(null, newUser);
						});
				}
			});
		}
	)
);
