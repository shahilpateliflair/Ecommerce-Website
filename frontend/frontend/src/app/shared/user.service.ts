import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { user } from '../models/user';
import { IUserLogin } from '../interfaces/IUsersLogin';
import { HttpClient } from '@angular/common/http';
import { USER_LOGIN_URL, USER_REGISTER_URL } from './constants/urls';
import { ToastrService } from 'ngx-toastr';
import { IUserRegister } from '../interfaces/IUsersRegister';
import { Token } from '@angular/compiler';

const USER_KEY= 'User'
const TOKEN_KEY = 'token';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  


  private userSubject = new BehaviorSubject<user>(this.getuserFromLocalStorage());
  public userObservable:Observable<user>;
  public isAuthenticated: boolean = false;
  token: any;
  constructor(private http:HttpClient,private toaster:ToastrService) {
    this.userObservable=this.userSubject.asObservable();
   }

   public get currentUser():user{
return this.userSubject.value;
   }
  
login(userLogin: IUserLogin): Observable<user> {
  return this.http.post<user>(USER_LOGIN_URL, userLogin).pipe(
    tap({
      next: (userData) => {
        console.log('Login response:', userData); 
        const token = userData.token; 
        localStorage.setItem('token', 'true');

        if (token) {
          console.log('Token:', token); 
        
        } else {
          console.error('Token not found in response');
        }
        this.setuserToLocalStorage(userData);
          
        this.userSubject.next(userData);
        this.toaster.success(`Welcome to E-commerce ${userData.name}!`, 'Login successful');
      },
      
      error: (errorResponse) => {
        this.toaster.error(errorResponse.error, 'Login failed');
      }
    })
  );
}


   register(userRegister:IUserRegister):Observable<user>{
return this.http.post<user>(USER_REGISTER_URL,userRegister).pipe(
  tap({

    next: (user)=>{
      this.setuserToLocalStorage(user)
this.userSubject.next(user);
this.toaster.success(
`welcome to E-commerce ${user.name}!`,
'Register successfully'
)
    },
    error: (errorResponse)=>{
      this.toaster.error(errorResponse.error,'Register failed')
    }
  })
)
}

getUser():Observable<user[]>{
  return this.http.get<user[]>(USER_REGISTER_URL)
// return this.http.get<user[]>('http://localhost:42000/register')
}

   logout(){

this.userSubject.next(new user());
localStorage.removeItem(USER_KEY);
localStorage.removeItem(TOKEN_KEY);
// this.isAuthenticated = false;
// window.location.reload();
}

   private setuserToLocalStorage(user:user) {
    localStorage.setItem(USER_KEY,JSON.stringify(user))
    localStorage.setItem(TOKEN_KEY, JSON.stringify(user.token));
    this.isAuthenticated = true;
    }

    private getuserFromLocalStorage():user {
     const userJson = localStorage.getItem(USER_KEY)
     if(userJson) return JSON.parse(userJson) as user;
     return new user();
      }
  getToken(): string | null {
     
        return localStorage.getItem('token');
      }
  get isAuth(): boolean {
    return !!this.getToken();
  }
}


//  private isauthentication = false;

  //  authentication(): boolean {
  //   return this.isauthentication;
  // }
  

   
  // isLoggedIn(): boolean {
  //   return !!this.currentUser && !!this.currentUser.token;
  // }