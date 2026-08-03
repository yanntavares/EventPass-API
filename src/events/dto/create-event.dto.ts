import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';
import { IsDateInFuture, IsGreaterThan } from 'src/common/date.decorators';

export class CreateEventDto {
  @ApiProperty({
    description: 'Título do evento',
    example: 'Seed a Tour',
  })
  @IsNotEmpty({ message: 'O título do evento não pode ser vazio' })
  title!: string;

  @ApiProperty({
    description: 'Descrição do evento',
    example: 'Tour pela empresa X',
  })
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Data e hora de início do evento',
    example: '2026-12-01T10:00:00Z',
  })
  @Type(() => Date)
  @IsDate({ message: 'A data de início deve ser uma data válida' })
  @IsDateInFuture({ message: 'A data de início deve ser posterior à data atual' })
  startDateTime!: Date;

  @ApiProperty({
    description: 'Data e hora de término do evento',
    example: '2026-12-01T12:00:00Z',
  })
  @Type(() => Date)
  @IsDate({ message: 'A data de término deve ser uma data válida' })
  @IsGreaterThan('startDateTime', {
    message: 'A data de término deve ser posterior à data de início',
  })
  endDateTime!: Date;

  @ApiProperty({
    description: 'ID do usuário que criou o evento',
  })
  @IsNotEmpty({ message: 'O ID do usuário não pode ser vazio' })
  @IsUUID('4', { message: 'O ID do usuário deve ser um UUID válido' })
  userID!: string;
}
