import { Request, Response } from 'express';

export interface IAuthController {
    
    login(req: Request<{}, {}, {}>, res: Response<string>): void;
    loginCallback(req: Request<{}, {}, {}>, res: Response<string>): void;

}

