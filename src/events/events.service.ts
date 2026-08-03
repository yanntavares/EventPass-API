import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EventsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createEventDto: CreateEventDto) {
    const isConflicting = await this.prisma.events.findFirst({
      where: {
        startDateTime: {
          lte: createEventDto.endDateTime,
        },
        endDateTime: {
          gte: createEventDto.startDateTime,
        },
        status: 'SCHEDULED',
        userID: createEventDto.userID,
      },
    });

    if (isConflicting) {
      throw new ConflictException('O evento conflita com outro evento existente');
    }

    const existingUser = await this.prisma.user.findUnique({
      where: { id: createEventDto.userID },
    });

    if (!existingUser) {
      throw new NotFoundException('Usuário não encontrado');
    }

    if (existingUser.status !== 'ACTIVE') {
      throw new ConflictException('O usuário está inativo e não pode criar eventos');
    }

    return await this.prisma.events.create({
      data: createEventDto,
    });
  }

  async findAll() {
    return await this.prisma.events.findMany();
  }

  async findOne(id: string) {
    const event = await this.prisma.events.findUnique({
      where: { id },
    });

    if (!event) {
      throw new NotFoundException(`Evento não encontrado`);
    }

    return event;
  }

  async update(id: string, updateEventDto: UpdateEventDto) {
    await this.findOne(id);

    return this.prisma.events.update({
      where: { id },
      data: updateEventDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.events.update({
      where: { id },
      data: { status: 'CANCELED' },
    });
  }
}
