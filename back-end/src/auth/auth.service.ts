import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { access } from 'fs';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService,
    ){}

    async login(email:string, pass:string){
        const user = await this.userService.validateUser(email, pass);

        if(!user){
            throw new UnauthorizedException('Credenciais inválidas');
        }

        const payload = {sub: user.id, email: user.email};

        return {
            access_token: this.jwtService.sign(payload),
            user: { id: user.id, name: user.name, email: user.email }
        };

    }
}
