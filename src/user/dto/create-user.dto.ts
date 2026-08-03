import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'Email do usuário',
    example: 'john.doe@example.com',
  })
  @IsEmail({}, { message: 'Deve ser um email válido' })
  @IsNotEmpty({ message: 'O email não pode ser vazio' })
  email!: string;

  @ApiProperty({
    description: 'Nome completo do usuário',
    example: 'John Doe',
  })
  @IsNotEmpty({ message: 'O nome completo não pode ser vazio' })
  fullName!: string;

  @ApiProperty({
    description: 'Data de nascimento do usuário',
    example: '1990-01-01T00:00:00:00Z',
  })
  @IsNotEmpty({ message: 'A data de nascimento não pode ser vazia' })
  dateBirth!: Date;

  @ApiProperty({
    description: 'Número de telefone do usuário',
    example: '+55 11 99999-9999',
  })
  @IsNotEmpty({ message: 'O número de telefone não pode ser vazio' })
  phoneNumber!: string;
}
