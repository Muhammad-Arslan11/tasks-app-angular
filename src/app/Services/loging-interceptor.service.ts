import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Observable, tap } from "rxjs";

export class LoggingInterceptor implements HttpInterceptor{
    intercept(req:HttpRequest<any>, next:HttpHandler): Observable<HttpEvent<any>> {
        console.log('logging interceptor called');
        console.log(req.url)
        return next.handle(req);
    }
}