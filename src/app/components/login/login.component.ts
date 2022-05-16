import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/core/account.service';
import { JwtUtil } from 'src/app/core/jwt.util';
import { StateStorageService } from 'src/app/core/state-storage.service';
import { Lavozim } from 'src/app/shared/model/lavozimlar';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: any;
  value = 'Clear me';

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private loginService: AuthenticationService,
    private _snackBar: MatSnackBar,
    private jwtUtil: JwtUtil,
    private stateStorageService: StateStorageService,
    private accountService: AccountService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(6)]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      rememberMe: [null],
    });
  }
  onLogin() {

    const loginParol = this.loginForm.getRawValue();

    this.loginService.login(loginParol).subscribe(
      (data) => {
       
        if (this.accountService.hasAnyAuthority([Lavozim.ADMIN, Lavozim.HOKIM, Lavozim.SUPER_ADMIN])) {
          this.router.navigate(['/admin/viloyat/1']);
        } else if (this.accountService.hasAnyAuthority([Lavozim.MAHALLA])) {
          this.accountService.identity().subscribe(user => {
            this.router.navigate(['/mahalla', user?.territory])
          })
        }
      }
    )
  }
}
