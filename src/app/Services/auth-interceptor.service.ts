import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Observable, tap } from "rxjs";

export class AuthInterceptor implements HttpInterceptor{
    intercept(req:HttpRequest<any>, next:HttpHandler): Observable<HttpEvent<any>> {
        console.log('interceptor called');
        const modifiedReq = req.clone({headers:req.headers.append('auth', 'xyz')})
        return next.handle(modifiedReq).pipe(tap((event)=>{
            if(event.type === HttpEventType.Response){
                console.log('res: ', event.body)
            }
        }));
    }
}