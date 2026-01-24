import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Task } from '../../Model/Task';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.css'],
  standalone:true,
  imports:[FormsModule]
})
export class CreateTaskComponent {
  @Output()
  CloseForm: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() emitTask:EventEmitter<Task> = new EventEmitter<Task>();

  OnCloseForm(){
    this.CloseForm.emit(false);
  }
  OnFormSubmitted(form:NgForm){
    console.log(form.value);
    this.emitTask.emit(form.value);
    form.resetForm();
    this.CloseForm.emit(false);
  }
}