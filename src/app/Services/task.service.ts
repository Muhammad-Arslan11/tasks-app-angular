import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Task } from "../Model/Task";
import { map, Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class TaskService {
    constructor(private http: HttpClient) { }
    errorSubject:Subject<HttpErrorResponse> = new Subject<HttpErrorResponse>();

    getAllTasks() {
        const url = 'https://angular-httpclient-6c7b0-default-rtdb.asia-southeast1.firebasedatabase.app/task.json';
        return this.http.get<{ [key: string]: Task }>(url).pipe(map((res) => {
            if (!res) return [];
            let task = [];
            for (let key in res) {
                if (res.hasOwnProperty(key)) {
                    task.push({ ...res[key], id: key });
                }
            }
            return task;
        })).subscribe({
            error:(err)=>{
              this.errorSubject.next(err);
            }
        })
    }
    createTask(data: Task) {
        const url = `https://angular-httpclient-6c7b0-default-rtdb.asia-southeast1.firebasedatabase.app/task/.json`;
        return this.http.post(url, data, { headers: { 'my-header': 'hello' } })
        .subscribe({error:(err)=>{
              this.errorSubject.next(err);
            }
        })

    }
    updateTask(data: Task, id: string | undefined) {
      const url = `https://angular-httpclient-6c7b0-default-rtdb.asia-southeast1.firebasedatabase.app/task/` + id + `.json`;
      return this.http.put(url, data).subscribe({
        error:(err)=>{
              this.errorSubject.next(err);
            }
      })
    }
    deleteTask(id: string | undefined) {
        const url = `https://angular-httpclient-6c7b0-default-rtdb.asia-southeast1.firebasedatabase.app/task/` + id + `.json`;
        return this.http.delete(url).subscribe({
            error:(err)=>{
              this.errorSubject.next(err);
            }
        })
    }
    deleteAllTasks() {
        const url = `https://angular-httpclient-6c7b0-default-rtdb.asia-southeast1.firebasedatabase.app/task/.json`;
        return this.http.delete(url).subscribe({
            error:(err)=>{
              this.errorSubject.next(err);
            }
        })
    }

}