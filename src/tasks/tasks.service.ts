import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.entity';
import { v4 } from 'uuid'
import { UpdateTaskDto } from './dto/task.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = [
        {
            id: v4(),
            title: 'First task',
            description: 'Lorem ipsum whatever',
            status: TaskStatus.PENDING,
        }
    ];
    getAllTasks(): Task[] {
        return this.tasks;
    }
    createTask(title: string, description: string): Task {
        const task = {
            id: v4(),
            title,
            description,
            status: TaskStatus.PENDING
        };
        this.tasks.push(task);
        return task;
    }

    getTaskById(id: string): Task | undefined {
        const task = this.tasks.find(task => task.id === id);
        return task;
    }

    updateTask(id: string, updatedFields: UpdateTaskDto): Task {
        const task = this.getTaskById(id);
        if (task) {
            const newTask = Object.assign(task, updatedFields);
            this.tasks = this.tasks.map(task => task.id === id ? newTask : task);
            return newTask;
        } else {
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }
    }

    deleteTask(id: string): void {
        const task = this.getTaskById(id);
        if (task) {
            this.tasks = this.tasks.filter(task => task.id !== id);
        } else {
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }
    }
}
