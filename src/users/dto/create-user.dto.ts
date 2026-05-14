import { 
  IsEmail,      
  IsNotEmpty,   
  IsString,     
  MinLength,    
  IsOptional,   
  IsEnum        
} from 'class-validator';
import { Role } from 'generated/prisma/enums';


export class CreateUserDto {
    //email validation
    @IsEmail({},{ message: 'Please provide valid email'})
    @IsNotEmpty({ message: 'Email is required' })
    email!: string;

    // Name validation
    @IsString()
    @IsNotEmpty({ message: 'Name is required' })
    name!: string;

    // Password validation
    @IsString()
    @MinLength(8, { message: 'Password must be at least 8 characters' })
    password!: string;

    // Optional role
    @IsOptional()  
    @IsEnum(Role, { message: 'Invalid role' })
    role?: Role;
}
