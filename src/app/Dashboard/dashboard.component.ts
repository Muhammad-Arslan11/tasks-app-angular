import { Component, OnInit, inject, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateTaskComponent } from './create-task/create-task.component';
import { HttpClient } from '@angular/common/http';
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

  ngOnInit() {
    // this.fetchAllTasks();
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
      this.taskService.updateTask(data, this.selectedId,).subscribe({
        next:(res)=> {
          console.log(res)
          if(!res){
            return;
          }
          this.fetchAllTasks();
          this.fetchAllTasks();
        }
      });
    }else{
      this.selectedTask = { title: '',desc: '', assignedTo: '', createdAt: '',priority: '',status: '',}
      this.taskService.createTask(data).subscribe()
    }
  }
  fetchAllTasks() {
    this.taskService.getAllTasks().subscribe({
      next: (task) => {
        console.log(task);
        setTimeout(() => {
          this.tasks = task;
        }, 100);
      },
      error:(error)=>{console.log(error)}
    });
  }
  editTask(id: string) {
    this.showCreateTaskForm = true;
    this.selectedId = id;
    this.editMode = true;
    // get the data from id
    this.selectedTask = this.tasks.find((t)=> t.id === id);
  }
  deleteTask(id: string | undefined) {
   this.taskService.deleteTask(id).subscribe({
      next: (res) => {
        if(!res){
          return;
        }
         this.fetchAllTasks();
         this.fetchAllTasks();
        // console.log(res);
        // this.tasks = this.tasks.filter((task) => task.id !== id);
      },
      error: (error) => console.log(error),

    });
  }
  deleteAllTasks() {
      this.taskService.deleteAllTasks().subscribe();
  }
}