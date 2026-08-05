import { ConflictException, NotFoundException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import type { Events, User } from 'src/generated/prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new ConflictException('O email já está em uso');
    }

    return this.prisma.user.create({
      data: createUserDto,
    });
  }

  async findAll(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`Usuário não encontrado`);
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    await this.findOne(id);

    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async remove(id: string): Promise<User> {
    await this.findOne(id);

    const [user] = await this.prisma.$transaction([
      //$transaction is used to queue multiple operations and execute them in a single transaction, ensuring atomicity and consistency.
      this.prisma.user.update({
        where: { id },
        data: { status: 'INACTIVE' },
      }),
      this.prisma.events.updateMany({
        where: { userID: id, status: 'SCHEDULED' },
        data: { status: 'CANCELED' },
      }),
    ]);
    return user;
  }

  async deleteUserPermanently(id: string): Promise<void> {
    await this.findOne(id);

    await this.prisma.$transaction([
      this.prisma.events.deleteMany({
        where: { userID: id },
      }),
      this.prisma.user.delete({
        where: { id },
      }),
    ]);

    return;
  }

  async findUsersEvents(id: string): Promise<Events[]> {
    await this.findOne(id);
    return this.prisma.events.findMany({
      where: { userID: id },
    });
  }
}
