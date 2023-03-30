import { Body, Controller, Get, Post, Delete, Param, Patch, HttpCode } from '@nestjs/common';
import { TasksService } from './tasks.service'
import { CreateTaskDto, UpdateTaskDto } from './dto/task.dto'

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) { }

    @Get()
    getAllTasks() {
        return this.tasksService.getAllTasks();
    }

    @Post()
    createTask(@Body() newTask: CreateTaskDto) {
        return this.tasksService.createTask(newTask.title, newTask.description);
    }

    @Patch(':id')
    updateTask(@Param('id') id: string, @Body() updatedFields: UpdateTaskDto) {
        return this.tasksService.updateTask(id, updatedFields);
    }

    @Delete(':id')
    @HttpCode(204)
    deleteTask(@Param('id') id: string) {
        return this.tasksService.deleteTask(id);
    }
}
