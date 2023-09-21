import { IsString, IsNotEmpty } from "class-validator";

export class AuthDto{
    @IsString()
    @IsNotEmpty({message: 'username is required'})
    username: string;

    @IsString()
    @IsNotEmpty({message: 'password is required'})
    password: string;
}