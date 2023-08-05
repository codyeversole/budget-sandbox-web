import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { catchError, EMPTY, Observable } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
    providedIn: 'root'
})
export class ErrorInterceptor implements HttpInterceptor {

    constructor(
        private router: Router
    ){}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError((error) => {
        return this.handleError(error);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    })) as Observable<HttpEvent<any>>;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error(error);
    } else {
      const errorEnum = Number(error.error);
      if(error.status == 401){   
        console.error(error); 
        this.router.navigate(['/']);
      } else if(error.status === 400 && isNaN(errorEnum) == false){
        console.error(error);
      } else {        
        console.error(error);
      }
    }
    
    return EMPTY;
  }

}