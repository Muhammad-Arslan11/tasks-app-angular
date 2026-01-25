import { Component, EventEmitter, Input, Output, SimpleChange, SimpleChanges, ViewChild, viewChild } from '@angular/core';
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
  @Input() editTask:boolean = false;
  @Input() selectedId:string | undefined;
  @Input() selectedTask!: Task;

  @ViewChild('taskForm') taskForm!:NgForm;

  ngOnInit(){
    console.log('editTask: ',this.editTask);
    console.log('selectedTask: ', this.selectedTask);
  }
  ngOnChanges(changes:SimpleChanges){
    if (changes['editTask']) {
      console.log('editTask changed:', changes['editTask'].currentValue);
    }

    if (changes['selectedTask']) {
      console.log('selectedTask changed:',changes['selectedTask'].currentValue);
  }
}
  ngAfterViewInit(){
    setTimeout(()=>{
      this.taskForm.form.patchValue(this.selectedTask);
    }, 100);
   
  }
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