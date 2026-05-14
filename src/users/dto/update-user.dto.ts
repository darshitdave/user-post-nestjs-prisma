import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

// PartialType makes a copy of CreateUserDto with all fields optional
export class UpdateUserDto extends PartialType(CreateUserDto) {}
