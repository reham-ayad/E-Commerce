import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ResetPasswordService } from '../../../core/services/reset-password.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  imports: [ReactiveFormsModule,NgIf],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {
  step:number=1;
constructor(private _resetpassword:ResetPasswordService, private toastr: ToastrService,private _auth:AuthService,private _router:Router){}
  sendemail:FormGroup=new FormGroup({
    email:new FormControl(null,[Validators.required,Validators.email])
  })
 submitEmail(){
this._resetpassword.verfyEmail(this.sendemail.value).subscribe({
  next:(res)=>{
    if(res.statusMsg=="success"){
      this.step=2
      this.toastr.success(res.message);
    }
  },
  error:(err)=>{}
})
 }
 verfycode:FormGroup=new FormGroup({
  resetCode:new FormControl(null,[Validators.required])
  })
 submitCode(){
  this._resetpassword.verfyCode(this.verfycode.value).subscribe({
    next:(res)=>{
      if(res.status=='Success'){
        this.step=3;

      }
    }

  })
 }


  resetpassword:FormGroup=new FormGroup({
    email:new FormControl(null,[Validators.required,Validators.email]),
    newPassword:new FormControl(null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)])
    })
    confirmpassword(){
      this._resetpassword.resetpassword(this.resetpassword.value).subscribe({
        next:(res)=>{
          console.log(res)
          if(res.token){
            localStorage.setItem('userToken',res.token)
            this._auth.decodeData();
            this._router.navigate(['/home'])

          }

        }

      })
  
    }

}
