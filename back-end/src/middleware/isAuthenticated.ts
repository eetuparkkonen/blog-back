import { Request, Response } from 'express';

export const checkAuthentication = (req: Request, res: Response, next: () => void) => {
	if (req.isAuthenticated()) {
		//req.isAuthenticated() will return true if user is logged in
		next();
	} else {
		res.status(401).send('You are not authenticated');
	}
};
