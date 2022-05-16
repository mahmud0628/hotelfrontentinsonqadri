import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AccountService } from 'src/app/core/account.service';
import { User } from 'src/app/shared/model/user';


@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})




export class ProfilComponent implements OnInit, AfterViewInit {

  data!: User | null;
  forma: any;
  tahrir = false;
  passForm: any;
  name = 'Angular';
  url = null;
  rasmManzil!: string;
  user!: User;

  constructor(private accountService: AccountService, public fb: FormBuilder) {

  }


  ngOnInit(): void {
    this.forma = this.fb.group({
      name: [''],
      surname: [''],
      fatherName: [null],
      phone: [null]

    });
    this.passForm = this.fb.group({
      old: [null],
      password: [null],
      //  confirm:[''],

    })

  }


  ngAfterViewInit(): void {
    this.accountService.identity().subscribe(data => {
      this.data = data;
      this.forma.reset(data);

    })
  }

  saqlash() {
    const userlar = this.forma.getRawValue();
    this.accountService.save(userlar).subscribe(data => {
      this.ngAfterViewInit();

    })
  }

  save() {
    const users = this.passForm.getRawValue();
    this.accountService.savePassword(users).subscribe(data => {
      this.ngAfterViewInit();
    })
  }


}
