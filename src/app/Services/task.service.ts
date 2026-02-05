import { HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Task } from "../Model/Task";
import { map, Subject, tap } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class TaskService {
    headers!:HttpHeaders;
    constructor(private http: HttpClient) {
        this.headers = new HttpHeaders();
        this.headers = this.headers.set('content-type', 'application/json');
        this.headers = this.headers.append('content-type', 'text/xml');
        this.headers = this.headers.set('Access-Control-Allow-Origin', '*');
        this.headers = this.headers.set('my-headers', 'headers')
     }
    errorSubject:Subject<HttpErrorResponse> = new Subject<HttpErrorResponse>();

    getAllTasks() {
        const url = 'https://angular-httpclient-6c7b0-default-rtdb.asia-southeast1.firebasedatabase.app/task.json';
        return this.http.get<{ [key: string]: Task }>(url, { headers: this.headers}).pipe(map((res) => {
            if (!res) return [];
            let task:any = [];
            for (let key in res) {
                if (res.hasOwnProperty(key)) {
                    task.push({ ...res[key], id: key });
                }
            }
            return task;
        }))
    }
    createTask(data: Task) {
        const url = `https://angular-httpclient-6c7b0-default-rtdb.asia-southeast1.firebasedatabase.app/task/.json`;
        return this.http.post(url, data, { headers: this.headers })
        .subscribe({error:(err)=>{
              this.errorSubject.next(err);
            }
        })

    }
    updateTask(data: Task, id: string | undefined) {
      const url = `https://angular-httpclient-6c7b0-default-rtdb.asia-southeast1.firebasedatabase.app/task/` + id + `.json`;
      return this.http.put(url, data, { headers: this.headers }).subscribe({
        error:(err)=>{
              this.errorSubject.next(err);
            }
      })
    }
    deleteTask(id: string | undefined) {
        const url = `https://angular-httpclient-6c7b0-default-rtdb.asia-southeast1.firebasedatabase.app/task/` + id + `.json`;
        return this.http.delete(url, { headers: this.headers, observe: 'response' }).pipe(tap()).subscribe({
            next:(res)=> console.log(res),
            error:(err)=>{
              this.errorSubject.next(err);
            }
        })
    }
    deleteAllTasks() {
        const url = `https://angular-httpclient-6c7b0-default-rtdb.asia-southeast1.firebasedatabase.app/task/.json`;
        return this.http.delete(url, {observe: 'response'}).subscribe({
            error:(err)=>{
              this.errorSubject.next(err);
            }
        })
    }

}