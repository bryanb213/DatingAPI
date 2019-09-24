import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpEvent, HttpErrorResponse, HttpHandler, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


// recognize error and catch it
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    intercept(
        req: import('@angular/common/http').HttpRequest<any>,
        next: import('@angular/common/http').HttpHandler
        ): import('rxjs').Observable<import('@angular/common/http').HttpEvent<any>> {
            // returning error from request
        return next.handle(req).pipe(
            catchError( error => {
                // start with 401 errors
                if ( error.status === 401) {
                    return throwError(error.statusText);
                }
                // look inside error object
                if (error instanceof HttpErrorResponse) {
                    // get errors from header and needs to match from api 500 err
                    const applicationError = error.headers.get('Application-Error');
                    if (applicationError) {
                        return throwError(applicationError);
                    }
                    // getting ModelState errors
                    const serverError = error.error;
                    let modelStateErrors = '';
                    // look inside the error object for errors which will also be an object so loop over keys
                    if (serverError.errors && typeof serverError.errors === 'object') {
                        for (const key in serverError.errors) {
                            if (serverError.errors[key]) {
                                modelStateErrors += serverError.errors[key] + '\n';
                            }
                        }
                    }
                    // return the error type
                    return throwError(modelStateErrors || serverError || 'Server Error');
                }
            })
        );
    }
}
// export and add it to app.module in provider
export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useXlass: ErrorInterceptor,
    multi: true
};
