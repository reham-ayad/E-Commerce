import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,NgIf,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  errormassage:string=''
    loading:boolean=false;
    constructor(private auth:AuthService , private router:Router){}
    //form group
   loginForm:FormGroup=new FormGroup({
      email:new FormControl(null,[Validators.required,Validators.email]),
      password:new FormControl(null,[Validators.required]),
  
  
  
  
  
    })
  submit22(){
    this.loading=true;
    console.log('touched',this.loginForm.get('email')?.touched)
    console.log('erorrs',this.loginForm.get('email')?.errors)
  
    console.log(this.loginForm);
    if(this.loginForm.valid){
      this.auth.login(this.loginForm.value).subscribe({
        next:(response)=>{
          this.loading=false;
          if(response.message == "success"){
localStorage.setItem('userToken',response.token);
this.auth.decodeData();

            this.router.navigate(['/home']);
          }
         
        },
        error:(err)=>{
          this.loading=false;
        
          this.errormassage=err.error.message;
        }
        
          })
        }
    }
    
  }
  


