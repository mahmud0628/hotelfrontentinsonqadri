import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { DeleteDialogComponent } from 'src/app/shared/dialogs/delete-dialog/delete-dialog.component';
import { User } from 'src/app/shared/model/user';
import { UserService } from './users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  displayedColumns: string[] = ['id','phone','name','surname','fatherName','status','roles','territory','password', 'amal'];
  isLoadingResults = false;
  isRateLimitReached = false;
  users: User[] = [];
  @ViewChild(MatPaginator) paginator?:MatPaginator;
  page=0;
  pageValue=10;
  length:any;
  constructor(
    private userService:UserService,
    public dialog: MatDialog,
    private router:Router
  ) {

  }
  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    
    this.isRateLimitReached = false;
    const pageable = {
      size: this.pageValue,
      page: this.page
    }  
    this.userService.getAll(pageable).subscribe((data: any) => {
      this.users = data.content;
      console.log(data.content);
      
      this.length = data.totalElements;
    });
  }
  pageClick(){
    const pageable = {
       size: this.paginator?.pageSize,
       page: this.paginator?.pageIndex
     }
    this.userService.getAll(pageable).subscribe((data: any) => {
      this.users = data.content;
    });
   }
  ochirish(id: number) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      maxWidth: "400px",
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.userService.deleteById(id).subscribe(
          (success: any) => {
            this.ngAfterViewInit();
          },
          (error) => {
            console.log(error);
          }
        );
      };
    });
  }
}
