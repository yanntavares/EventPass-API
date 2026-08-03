import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import {
  ApiDocCreateEvent,
  ApiDocDeleteEvent,
  ApiDocFindAllEvents,
  ApiDocFindEventById,
  ApiDocUpdateEvent,
} from './event.swagger';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  @ApiDocCreateEvent()
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.create(createEventDto);
  }

  @Get()
  @ApiDocFindAllEvents()
  findAll() {
    return this.eventsService.findAll();
  }

  @Get(':id')
  @ApiDocFindEventById()
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(id);
  }

  @Patch(':id')
  @ApiDocUpdateEvent()
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventsService.update(id, updateEventDto);
  }

  @Delete(':id')
  @ApiDocDeleteEvent()
  remove(@Param('id') id: string) {
    return this.eventsService.remove(id);
  }
}
