import { Component, OnInit, inject, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateTaskComponent } from './create-task/create-task.component';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject } from '@angular/core';
import { Task } from '../Model/Task';
import { pipe, map } from 'rxjs';
import { TaskService } from '../Services/task.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.css'],
  standalone: true,
  imports: [CreateTaskComponent, CommonModule]
})
export class DashboardComponent {
  constructor(private taskService: TaskService) { }
  
  tasks: any[] = [];
  showCreateTaskForm: boolean = false;
  http: HttpClient = inject(HttpClient);
  selectedId: string | undefined;
  editMode:boolean = false;
  selectedTask!:Task;
  errorMsg!:string;

  ngOnInit() {
    this.taskService.errorSubject.subscribe({
      next:(httpError)=>{
        this.handleErrorResponse(httpError);
      }
    })
  }

  OpenCreateTaskForm() {
    this.showCreateTaskForm = true;
  }

  CloseCreateTaskForm() {
    this.showCreateTaskForm = false;
  }
  createOrUpdateTask(data: Task) {
    // console.log('data: ',data);
    if(this.editMode && this.selectedId){
      this.selectedTask = data;
      this.taskService.updateTask(data, this.selectedId,);
    }else{
      this.selectedTask = { title: '',desc: '', assignedTo: '', createdAt: '',priority: '',status: '',}
      this.taskService.createTask(data);
    }
  }
  fetchAllTasks() {
    this.taskService.getAllTasks();
  }
  editTask(id: string) {
    this.showCreateTaskForm = true;
    this.selectedId = id;
    this.editMode = true;
    // get the data from id
    this.selectedTask = this.tasks.find((t)=> t.id === id);
  }
  deleteTask(id: string | undefined) {
   this.taskService.deleteTask(id);
  }
  deleteAllTasks() {
      this.taskService.deleteAllTasks();
  }
  handleErrorResponse(err:HttpErrorResponse){
    // console.log('error.message: ', err.message);
    // console.log('error.error: ', err.error.error);
  if(err.error.error === 'Permission denied'){
    this.errorMsg = err.message
  }else{
    this.errorMsg = 'You do not have permission to perform this action'
  }
  console.log(this.errorMsg);
  setTimeout(()=>{
    this.errorMsg = '';
    console.log(this.errorMsg)
  }, 3000)
  }
}