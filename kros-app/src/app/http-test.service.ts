import {Injectable} from "@angular/core";
import {HttpErrorResponse, HttpClient, HttpHeaders} from "@angular/common/http";
import { map, catchError, retry } from 'rxjs/operators';
import { throwError, Observable } from "rxjs";
import { Contact } from './contact';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable()
export class HTTPTestService{
  
    constructor (private _http: HttpClient) {}

    getAllPeople(){
      return this._http.get('http://sampleaspnetcorewebapi.azurewebsites.net/api/v2/People').pipe(
        catchError(this.handleError)
      );
    }

    addContact (contact: Contact): Observable<Contact>{
        return this._http.post<Contact>('http://sampleaspnetcorewebapi.azurewebsites.net/api/v2/People',
        contact, httpOptions).pipe(
            catchError(this.handleError)
          );
    }

    deleteContact (id: number): Observable<{}> {
        const url = `http://sampleaspnetcorewebapi.azurewebsites.net/api/v2/People/${id}`; 
        return this._http.delete(url, httpOptions)
          .pipe(
            catchError(this.handleError)
          );
     }

    updateContact (contact: Contact): Observable<Contact>{
      const url = `http://sampleaspnetcorewebapi.azurewebsites.net/api/v2/People/${contact.id}`;
      return this._http.put<Contact>(url, contact, httpOptions)
        .pipe(
          catchError(this.handleError)
        );
    }
    
    private handleError(error: HttpErrorResponse){
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
          } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
              `Backend returned code ${error.status}, ` +
              `body was: ${error.error}`);
          }
          // return an observable with a user-facing error message
          return throwError(
            'Something bad happened; please try again later.'); 
    }
    
}
