import { Component, OnInit, inject, EventEmitter, Output} from '@angular/core';
import { CommonModule} from '@angular/common';
import { CreateTaskComponent } from './create-task/create-task.component';
import { HttpClient } from '@angular/common/http';
import { Inject } from '@angular/core';
import { Task } from '../Model/Task';
import { pipe, map } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.css'],
  standalone:true,
  imports:[CreateTaskComponent, CommonModule]
})
export class DashboardComponent {
  tasks:any[] = [];
  showCreateTaskForm: boolean = false;
  http:HttpClient = inject(HttpClient);

  ngOnInit(){
    // this.fetchAllTasks();
  }

  OpenCreateTaskForm(){
    // console.log('OpenCreateTaskForm');
    this.showCreateTaskForm = true;
  }

  CloseCreateTaskForm(){
    this.showCreateTaskForm = false;
  }
  createTask(data:any){
  console.log('data: ',data);
  const url = 'https://angular-httpclient-6c7b0-default-rtdb.asia-southeast1.firebasedatabase.app/task.json';
  const req = this.http.post(url,data, {headers:{'my-header':'hello'}}
).subscribe({
   next:(res)=>console.log(res),
   error:(err)=>console.log('err: ',err)
});
}
fetchAllTasks(){
  const url = 'https://angular-httpclient-6c7b0-default-rtdb.asia-southeast1.firebasedatabase.app/task.json';
  const req = this.http.get<{[key:string]:Task}>(url).pipe(map((res)=>{
    let task = [];
    for(let key in res){
        if(res.hasOwnProperty(key)){
      task.push({...res[key], id:key});
        }
    }
    // this.tasks = task;
    return task;
  })).subscribe(task => {
    console.log(task);
    setTimeout(() => {this.tasks = task}, 0);
  

}); 
}
 editTask(id:string){
   
 }
 deleteTask(id:string | undefined){
  const url = `https://angular-httpclient-6c7b0-default-rtdb.asia-southeast1.firebasedatabase.app/task/`+id+`.json`;
   this.http.delete(url).subscribe({
    next:(res)=> {
      console.log(res);
      this.tasks = this.tasks.filter((task)=> task.id !== id);
    },
    error:(err)=> console.log(err),

   });
 }
  deleteAllTasks(){
  const url = `https://angular-httpclient-6c7b0-default-rtdb.asia-southeast1.firebasedatabase.app/task/.json`;
   this.http.delete(url).subscribe();
 }
}