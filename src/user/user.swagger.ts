import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

export function ApiDocCreateUser() {
  return applyDecorators(
    ApiOperation({
      summary: 'Cria um novo usuário',
      description: 'Cria um novo usuário',
    }),
    ApiResponse({
      status: 201,
      description: 'Usuário criado com sucesso',
      schema: {
        type: 'object',
        properties: {
          id: { type: 'string', description: 'ID do usuário' },
          fullName: { type: 'string', description: 'Nome completo do usuário' },
          email: { type: 'string', description: 'Email do usuário' },
          dateBirth: {
            type: 'string',
            format: 'date',
            description: 'Data de nascimento do usuário',
          },
          phone: { type: 'string', description: 'Telefone do usuário' },
          createdAt: { type: 'string', format: 'date-time', description: 'Data de criação' },
          updatedAt: { type: 'string', format: 'date-time', description: 'Data de atualização' },
        },
      },
    }),
    ApiResponse({
      status: 409,
      description: 'Conflito. O email já está em uso.',
    }),
    ApiResponse({
      status: 500,
      description: 'Erro interno do servidor',
    }),
  );
}

export function ApiDocFindAllUsers() {
  return applyDecorators(
    ApiOperation({
      summary: 'Retorna todos os usuários',
      description: 'Retorna uma lista com todos os usuários cadastrados no sistema',
    }),
    ApiResponse({
      status: 200,
      description: 'Lista de usuários retornada com sucesso',
      schema: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'string', description: 'ID do usuário' },
            fullName: { type: 'string', description: 'Nome completo do usuário' },
            email: { type: 'string', description: 'Email do usuário' },
            dateBirth: {
              type: 'string',
              format: 'date',
              description: 'Data de nascimento do usuário',
            },
            phone: { type: 'string', description: 'Telefone do usuário' },
            createdAt: { type: 'string', format: 'date-time', description: 'Data de criação' },
            updatedAt: { type: 'string', format: 'date-time', description: 'Data de atualização' },
          },
        },
      },
    }),
    ApiResponse({
      status: 500,
      description: 'Erro interno do servidor',
    }),
  );
}

export function ApiDocFindUserById() {
  return applyDecorators(
    ApiOperation({
      summary: 'Retorna um usuário pelo ID',
      description: 'Retorna um usuário específico com base no ID fornecido',
    }),
    ApiParam({
      name: 'id',
      description: 'ID do usuário a ser retornado',
      required: true,
      schema: {
        type: 'string',
      },
    }),
    ApiResponse({
      status: 200,
      description: 'Usuário retornado com sucesso',
      schema: {
        type: 'object',
        properties: {
          id: { type: 'string', description: 'ID do usuário' },
          fullName: { type: 'string', description: 'Nome completo do usuário' },
          email: { type: 'string', description: 'Email do usuário' },
          dateBirth: {
            type: 'string',
            format: 'date',
            description: 'Data de nascimento do usuário',
          },
          phone: { type: 'string', description: 'Telefone do usuário' },
          createdAt: { type: 'string', format: 'date-time', description: 'Data de criação' },
          updatedAt: { type: 'string', format: 'date-time', description: 'Data de atualização' },
        },
      },
    }),
    ApiResponse({
      status: 404,
      description: 'Usuário não encontrado',
    }),
    ApiResponse({
      status: 500,
      description: 'Erro interno do servidor',
    }),
  );
}

export function ApiDocUpdateUser() {
  return applyDecorators(
    ApiOperation({
      summary: 'Atualiza um usuário pelo ID',
      description: 'Atualiza os dados de um usuário específico com base no ID fornecido',
    }),
    ApiParam({
      name: 'id',
      description: 'ID do usuário a ser atualizado',
      required: true,
      schema: {
        type: 'string',
      },
    }),
    ApiResponse({
      status: 200,
      description: 'Usuário atualizado com sucesso',
      schema: {
        type: 'object',
        properties: {
          id: { type: 'string', description: 'ID do usuário' },
          fullName: { type: 'string', description: 'Nome completo do usuário' },
          email: { type: 'string', description: 'Email do usuário' },
          dateBirth: {
            type: 'string',
            format: 'date',
            description: 'Data de nascimento do usuário',
          },
          phone: { type: 'string', description: 'Telefone do usuário' },
          createdAt: { type: 'string', format: 'date-time', description: 'Data de criação' },
          updatedAt: { type: 'string', format: 'date-time', description: 'Data de atualização' },
        },
      },
    }),
    ApiResponse({
      status: 404,
      description: 'Usuário não encontrado',
    }),
    ApiResponse({
      status: 500,
      description: 'Erro interno do servidor',
    }),
  );
}

export function ApiDocDeleteUser() {
  return applyDecorators(
    ApiOperation({
      summary: 'Deleta um usuário pelo ID',
      description: 'Deleta um usuário específico com base no ID fornecido',
    }),
    ApiParam({
      name: 'id',
      description: 'ID do usuário a ser deletado',
      required: true,
      schema: {
        type: 'string',
      },
    }),
    ApiResponse({
      status: 200,
      description: 'Usuário deletado com sucesso',
    }),
    ApiResponse({
      status: 404,
      description: 'Usuário não encontrado',
    }),
    ApiResponse({
      status: 500,
      description: 'Erro interno do servidor',
    }),
  );
}

export function ApiDocFindUsersEvents() {
  return applyDecorators(
    ApiOperation({
      summary: 'Retorna os eventos de um usuário pelo ID',
      description:
        'Retorna uma lista de eventos associados a um usuário específico com base no ID fornecido',
    }),
    ApiParam({
      name: 'id',
      description: 'ID do usuário cujos eventos serão retornados',
      required: true,
      schema: {
        type: 'string',
      },
    }),
    ApiResponse({
      status: 200,
      description: 'Lista de eventos retornada com sucesso',
      schema: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'string', description: 'ID do evento' },
            title: { type: 'string', description: 'Título do evento' },
            startDateTime: {
              type: 'string',
              format: 'date-time',
              description: 'Data de início do evento',
            },
            endDateTime: {
              type: 'string',
              format: 'date-time',
              description: 'Data de término do evento',
            },
            status: {
              type: 'string',
              enum: ['SCHEDULED', 'COMPLETED', 'CANCELED'],
              description: 'Status do evento',
            },
            userID: { type: 'string', description: 'ID do usuário dono do evento' },
            createdAt: { type: 'string', format: 'date-time', description: 'Data de criação' },
            updatedAt: { type: 'string', format: 'date-time', description: 'Data de atualização' },
          },
        },
      },
    }),
    ApiResponse({
      status: 404,
      description: 'Usuário não encontrado',
    }),
    ApiResponse({
      status: 500,
      description: 'Erro interno do servidor',
    }),
  );
}
