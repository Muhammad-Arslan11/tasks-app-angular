import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { CreateTaskComponent } from './create-task/create-task.component';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { Task } from '../Model/Task';
import { TaskService } from '../Services/task.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.css'],
  standalone: true,
  imports: [CreateTaskComponent, CommonModule, TaskDetailsComponent]
})
export class DashboardComponent implements OnInit {

  constructor(private taskService: TaskService) {}

  http = inject(HttpClient);

  tasks: Task[] | undefined= [];
  selectedTask!: Task | undefined;              
  taskData!: Task | undefined;                  
  selectedId!: string | undefined;

  showCreateTaskForm = false;
  showTaskDetails = false;
  editMode = false;

  errorMsg: string | null = null;   

  ngOnInit(): void {
    this.taskService.errorSubject.subscribe({
      next: (httpError) => {
        this.handleErrorResponse(httpError);
      }
    });

    this.fetchAllTasks();
  }

  OpenCreateTaskForm(): void {
    this.showCreateTaskForm = true;
  }

  CloseCreateTaskForm(): void {
    this.showCreateTaskForm = false;
    this.editMode = false;
    this.selectedId = undefined;
    this.selectedTask = undefined;
  }

  openTaskDetails(id: string | undefined): void {
    if (!id) return;

    this.showTaskDetails = true;
    this.taskData = this.tasks?.find(task => task.id === id);
  }

  createOrUpdateTask(data: Task): void {
    if (this.editMode && this.selectedId) {
      this.taskService.updateTask(data, this.selectedId);
    } else {
      this.taskService.createTask(data);
    }
  }

  fetchAllTasks(): void {
    this.taskService.getAllTasks().subscribe(res => {
      this.tasks = res;
    });
  }

  editTask(id: string | undefined): void {
    if (!id) return;

    this.showCreateTaskForm = true;
    this.editMode = true;
    this.selectedId = id;
    this.selectedTask = this.tasks?.find(t => t.id === id);
  }

  deleteTask(id: string | undefined): void {    
    if (!id) return;
    this.taskService.deleteTask(id);
  }
  deleteAllTasks(): void {
    this.taskService.deleteAllTasks();
  }

  handleErrorResponse(err: HttpErrorResponse): void {
    if (err.error?.error === 'Permission denied') {
      this.errorMsg = err.message;
    } else {
      this.errorMsg = 'You do not have permission to perform this action';
    }

    setTimeout(() => {
      this.errorMsg = null;
    }, 3000);
  }
}