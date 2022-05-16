import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: any;
  minDate: Date;
  maxDate: Date;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private snakBar: MatSnackBar,
    private registerService : AuthenticationService) {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 60, 0, 0);
    this.maxDate = new Date(currentYear + 0, 0, 0);

    }

  ngOnInit(): void {
    this.registerForm =    this.formBuilder.group({
      id: [null,{disabled: true}],
      ism: [null, Validators.required],
      familiya: [null, Validators.required],
      sharif: [null],
      lavozimlar:[null,Validators.required],
      login: [null, [Validators.required, Validators.minLength(6)]],
      parol: [null, [Validators.required, Validators.minLength(6)]]
    });
  }
  checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
      let passwordInput = this.registerForm.controls[passwordKey],
          passwordConfirmationInput = this.registerForm.controls[passwordConfirmationKey];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({notEquivalent: true})
      }
      else {
          return passwordConfirmationInput.setErrors(null);
      }
    }
  }

  onRegister(){
    const register = this.registerForm.getRawValue();
    let lavozimlar:any=[];
    lavozimlar.push(register.lavozimlar);
    register.lavozimlar=lavozimlar;
    this.registerService.register(register).subscribe(
      (success) =>{
        this.snakBar.open("Muvaffaqiyatli ro'yxatdan o'tdingiz! Administrator tasdiqlashini kuting!", "ok")
       this.router.navigate([""]);
      },
      (error)=>{
        let message  = "bunday foydalanuvchi mavjud!";
          if(error?.error?.message){
            if(error.error.message!="INVALID_CREDENTIALS"){
              message = error.error.message;
            }
          }
          throw Error(message)

      }
    )
  }

  checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => {
    if(this.registerForm){
    let pass = this.registerForm.get('password')!.value;
    let confirmPass = this.registerForm.get('re_password')!.value
    return pass === confirmPass ? null : { notSame: true }
  } else {
    return { notSame: true };
  }
  }

}
