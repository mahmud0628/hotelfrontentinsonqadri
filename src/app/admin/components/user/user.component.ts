import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DeleteDialogComponent } from 'src/app/shared/dialogs/delete-dialog/delete-dialog.component';

import { User } from 'src/app/shared/model/user';
import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
users!:User[]
page: any = 0;
pageValue: any = 20;
panelOpenState = false;
displayedColumns: string[] = ['id', 'name', 'phone', 'role', 'surname', 'amal'];
sorovBajarilmoqda = false;
resultsLength = 0;
isLoadingResults = true;
isRateLimitReached = false;
@ViewChild(MatPaginator) paginator!: MatPaginator;
@ViewChild(MatSort) matSort!: MatSort;
tahrirRejim = false;
createForm: any;
activeCheck = false;
length: any;
text:any;
  constructor(private userService:UserService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,) { }

  ngOnInit(): void {
  }


  ngViewAfterInit():void{

    this.userService.getAll().subscribe((data:any)=>
    {
      this.users=data;
    })
  
  
    this.isRateLimitReached = false;
    const pageable = {
      size: this.pageValue,
      page: this.page
    }
    
   

  }
 

  pageClick() {
    const pageable = {
      size: this.paginator?.pageSize,
      page: this.paginator?.pageIndex
    }
    
  }
  // ochirish(tur: number) {
  //   this.tozalash();
  //   const dialogRef = this.dialog.open(DeleteDialogComponent, {
  //     maxWidth: "400px",
  //   });
  //   dialogRef.afterClosed().subscribe(dialogResult => {
  //     if (dialogResult) {
  //       this.userService.deleteById(tur).subscribe(
  //         (success: any) => {
  //           this.ngAfterViewInit();
  //         },
  //         (error) => {
  //           console.log(error);
  //         }
  //       );
  //     };
  //   });
  // }
  tozalash() {
    this.createForm.reset();
    this.tahrirRejim = false;
    this.sorovBajarilmoqda = false;
    this.panelOpenState = false;
  }
}
