import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../_models/User';

// adding authorization header because we need to be authorizedd to login


@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = environment.apiUrl;

  // base url is in the enviorments folder
  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    // return a user array
    return this.http.get<User[]>(this.baseUrl + 'users');
  }

  getUser(id): Observable<User> {
    console.log(id);
    return this.http.get<User>(this.baseUrl + 'users/' + id);
  }

  updateUser({ id, user }: { id: number; user: User; }) {
    return this.http.put(this.baseUrl + 'users/' + id, user);
  }

  serMainPhoto(userId: number, id: number) {
    // Need to send empty object for body since this is a post method
    return this.http.post(this.baseUrl + 'users/' + userId + '/photos/' + id + '/setMain', {});
  }

  deletePhoto(userId: number, id: number) {
    return this.http.delete(this.baseUrl + 'users/' + userId + '/photos/' + id);
  }
}
