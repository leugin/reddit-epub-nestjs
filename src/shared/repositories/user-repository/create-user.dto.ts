import { IsEmail, IsNotEmpty, Validate } from 'class-validator';
import { IsUniqueConstraint } from '../../custom-validations/is-unique.constraint';

export class CreateUserDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    @Validate(IsUniqueConstraint, [{table: 'user', column: 'email'}])
    email: string;
    password: string | null;
}
