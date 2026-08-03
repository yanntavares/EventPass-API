import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function ApiDocCreateEvent() {
  return applyDecorators(
    ApiOperation({
      summary: 'Cria um novo evento',
      description: 'Cria um novo evento',
    }),
    ApiResponse({
      status: 201,
      description: 'Evento criado com sucesso',
      schema: {
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
    }),
    ApiResponse({
      status: 400,
      description: 'Dados inválidos para criação do evento.',
    }),
    ApiResponse({
      status: 409,
      description: 'Conflito. O evento conflitua em data/hora com outro evento.',
    }),
    ApiResponse({
      status: 500,
      description: 'Erro interno do servidor',
    }),
  );
}

export function ApiDocFindAllEvents() {
  return applyDecorators(
    ApiOperation({
      summary: 'Retorna todos os eventos',
      description: 'Retorna uma lista com todos os eventos cadastrados no sistema',
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
      status: 500,
      description: 'Erro interno do servidor',
    }),
  );
}

export function ApiDocFindEventById() {
  return applyDecorators(
    ApiOperation({
      summary: 'Retorna um evento pelo ID',
      description: 'Retorna um evento específico com base no ID fornecido',
    }),
    ApiResponse({
      status: 200,
      description: 'Evento retornado com sucesso',
      schema: {
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
    }),
    ApiResponse({
      status: 404,
      description: 'Evento não encontrado',
    }),
    ApiResponse({
      status: 500,
      description: 'Erro interno do servidor',
    }),
  );
}

export function ApiDocUpdateEvent() {
  return applyDecorators(
    ApiOperation({
      summary: 'Atualiza um evento pelo ID',
      description: 'Atualiza um evento específico com base no ID fornecido',
    }),
    ApiResponse({
      status: 200,
      description: 'Evento atualizado com sucesso',
      schema: {
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
    }),
    ApiResponse({
      status: 400,
      description: 'Dados inválidos para atualização do evento.',
    }),
    ApiResponse({
      status: 404,
      description: 'Evento não encontrado',
    }),
    ApiResponse({
      status: 409,
      description: 'Conflito. O evento conflitua em data/hora com outro evento.',
    }),
    ApiResponse({
      status: 500,
      description: 'Erro interno do servidor',
    }),
  );
}

export function ApiDocDeleteEvent() {
  return applyDecorators(
    ApiOperation({
      summary: 'Deleta um evento pelo ID',
      description: 'Deleta um evento específico com base no ID fornecido',
    }),
    ApiResponse({
      status: 200,
      description: 'Evento deletado com sucesso',
    }),
    ApiResponse({
      status: 404,
      description: 'Evento não encontrado',
    }),
    ApiResponse({
      status: 500,
      description: 'Erro interno do servidor',
    }),
  );
}
