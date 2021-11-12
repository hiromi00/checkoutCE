import { AuthenticationStrategy } from "@loopback/authentication";
import { Request, RedirectRoute, HttpErrors } from "@loopback/rest";
import { UserProfile } from "@loopback/security";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import parseBearerToken from 'parse-bearer-token';
import { service } from "@loopback/core";
import { UserService } from "../services";
import { JwtPayload } from "jsonwebtoken";
import { repository } from "@loopback/repository";
import { ShoppingSessionRepository } from "../repositories";

export class UserAuth implements AuthenticationStrategy {
    name: string = 'user';

    constructor(
        @service(UserService) public userService: UserService,
        @repository(ShoppingSessionRepository) public shoppingSessionRepository: ShoppingSessionRepository,
    ) {}

    async authenticate(request: Request): Promise<UserProfile | undefined> {
        
        const token = parseBearerToken(request);
        if (!token) {
            throw new HttpErrors[401]('no token exists in the request');
        }
        
        const info = (this.userService.validateToken(token) as JwtPayload);
        
        if(info){
            const profile = Object.assign({
                id: info.data.id,
                username: info.data.username,
                email: info.data.email,
            });
            
            return profile;
            
        } else {
            throw new HttpErrors[401]('invalid Token');
        }
    }

}