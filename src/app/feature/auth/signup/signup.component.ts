import { Component } from '@angular/core';
import{AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators} from'@angular/forms';
import { AuthService } from '../../../core/services/auth/auth.service';
import { error } from 'console';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule,NgIf],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  errormassage:string=''
  loading:boolean=false;
  constructor(private auth:AuthService , private router:Router){}
  //form group
  registerForm:FormGroup=new FormGroup({
    name:new FormControl (null,[Validators.minLength(3),Validators.maxLength(10),Validators.required]),
    email:new FormControl(null,[Validators.required,Validators.email]),
    password:new FormControl(null,[Validators.required, Validators.pattern(/^[A-Z]\w{7}$/)]),
    rePassword:new FormControl(null,[Validators.required]),
    phone:new FormControl(null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]),
  },{validators:this.confirmpass})





confirmpass(group:AbstractControl){
  const password=group.get('password')?.value;
  const rePassword=group.get('rePassword')?.value;
if (password===rePassword){
  return null;
}else{
  return{mismatch:true}

}


}




submit22(){
  this.loading=true;
  console.log('touched',this.registerForm.get('name')?.touched)
  console.log('erorrs',this.registerForm.get('name')?.errors)

  console.log(this.registerForm);
  if (this.registerForm.invalid){
    this.registerForm.markAllAsTouched();
    return;
  }
 else if
  (this.registerForm.valid){
    this.auth.signup(this.registerForm.value).subscribe({
      next:(response)=>{
        this.loading=false;
        if(response.message == "success"){
          this.router.navigate(['/login']);
          
        }
        else{
          this.errormassage=response.message;
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
