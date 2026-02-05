import { Component, Output, EventEmitter , Input} from '@angular/core';
import { Task } from '../../Model/Task';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.css']
})
export class TaskDetailsComponent {
   @Output() closeTaskDetails:EventEmitter<boolean> = new EventEmitter();
   @Input() tasksData!:Task | undefined;

   handleCloseTaskDetails(){
    this.closeTaskDetails.emit();
   }
}