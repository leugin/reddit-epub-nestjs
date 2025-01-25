import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { PrismaService } from '../../provider/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@ValidatorConstraint({name: 'IsUniqueConstraint', async: true})
@Injectable()
export class IsUniqueConstraint implements ValidatorConstraintInterface {
  private exists
  constructor(private readonly prismaService:PrismaService){}
  defaultMessage(validationArguments?: ValidationArguments): string {
    const field: string = validationArguments.value
    console.log(validationArguments)
    return `${field}  already exist `
  }

  async validate(value: any, validationArguments?: ValidationArguments):  Promise<boolean> {

    const {table, column} = validationArguments.constraints[0]
    // @ts-ignore
    this.exists = await this.prismaService[table].findFirst({
      where: {
        [column]: value
      }
    })
    return this.exists === null
  }
}
