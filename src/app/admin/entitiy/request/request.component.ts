import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { DeleteDialogComponent } from 'src/app/shared/dialogs/delete-dialog/delete-dialog.component';
import { MediaViewComponent } from 'src/app/shared/dialogs/media-view/media-view.component';
import { SavedFile } from 'src/app/shared/model/saved-file';
import { Request } from 'src/app/shared/model/request';
import { Tuman } from 'src/app/shared/model/tuman';
import { User } from 'src/app/shared/model/user';
import { TumanService } from '../tuman/tuman.service';
import { UserService } from '../users/users.service';
import { RequestService } from './request.service';
import { Sektor } from 'src/app/shared/model/sektor';
import { Mahalla } from 'src/app/shared/model/mahalla';
import { MahallaService } from 'src/app/shared/service/mahalla.service';
import { SektorService } from 'src/app/shared/service/sektor.service';
// import { Mahalla } from 'src/app/shared/model/Mahalla';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit {
  page: any = 0;
  pageValue: any = 20;
  panelOpenState = false;
  displayedColumns: string[] = ['id', 'title', 'status', 'tashkilot', 'user', 'media', 'amal'];
  sorovBajarilmoqda = false;
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;
  tumanlar!:Tuman[];
  sektorlar!:Sektor[];
  mahallalar!:Mahalla[];
  request!: Request[];
  tahrirRejim = false;
  createForm: any;
  activeCheck = false;
  user!: User;
  length: any;
  text:any;
  constructor(
    public requestService: RequestService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    public userService: UserService,
    public mahallaService:MahallaService,
    public tumanService:TumanService,
    public sektorService:SektorService
  ) {
  }
  openDialogVideo(media: SavedFile,text:string) {
    this.tozalash();
    const dialogRef = this.dialog.open(MediaViewComponent, {
      maxWidth: "80vw",
      data: {
        url: "https://file.sayt.uz/123",
        text:this.request[0].text
      }
    });
    
      
  }

  ngOnInit(): void {
    //   id:number;
    //   text:string;
    //   type:RequestType;
    //   user:User;
    //   status:Status;
    //  tashkilot:Tashkilot;
    this.createForm = this.formBuilder.group({
      id: [{ value: '', disabled: true }],
      text: [null, Validators.required],
      title:[null],
      type: [null],
      user: [null],
      status: [null],
      tashkilot: [null],
      media: [null]
    });
  }
  ngAfterViewInit(): void {
    this.userService.getUser().subscribe(
      (data:any)=>{
        this.user=data;
        console.log(this.user);

      }

    )
    console.log(this.user);

    this.isRateLimitReached = false;
    const pageable = {
      size: this.pageValue,
      page: this.page
    }
    this.mahallaService.getAll().subscribe((data: any) => {
      this.mahallalar = data;
      console.log(data);
    });
    this.tumanService.getAll().subscribe((data: any) => {
      this.tumanlar = data;
      console.log(data);
    });
    this.sektorService.getAll().subscribe((data: any) => {
      this.sektorlar = data;
      this.isLoadingResults = false;
      this.length = data.totalElements;
      console.log(data);
    });
    this.requestService.getAll(pageable).subscribe((data: any) => {
      this.request = data.content;

      this.isLoadingResults = false;
      this.length = data.totalElements;
      console.log(data.content);
    });

  }
  // onConfirm(success: any): void {
  //   // Close the dialog, return true
  //   this.dialogRef.close(success);
  // }
  // onDismiss(): void {
  //   // Close the dialog, return false
  //   this.dialogRef.close(false);
  // }

  pageClick() {
    const pageable = {
      size: this.paginator?.pageSize,
      page: this.paginator?.pageIndex
    }
    this.requestService.getAll(pageable).subscribe((data: any) => {
      this.request = data.content;


    });
  }
  save(): void {
    const tur = this.createForm.getRawValue();
    this.sorovBajarilmoqda = true;
    if (this.tahrirRejim) {
      this.requestService.update(tur).subscribe(
        (success: any) => {
          this.createForm.reset();
          this.tahrirRejim = false;
          this.sorovBajarilmoqda = false;
          this.ngAfterViewInit();
        },
        (error) => {
          let message = "Xatoli ro'y berdi";
          console.log(error);
          if (error.error.message) {
            message = error.error.message;
          }
          this.sorovBajarilmoqda = false;
        },
      );
    } else {
      this.requestService.create(tur).subscribe(
        (success: any) => {
          this.createForm.reset();
          this.sorovBajarilmoqda = false;
          this.ngAfterViewInit();
        },
        (error) => {
          let message = "Xatoli ro'y berdi";
          console.log(error);
          if (error.error.message) {
            message = error.error.message;
          }
          this.sorovBajarilmoqda = false;
        }
      );
    }

  }

  edit(tur: Request) {
    this.tahrirRejim = true;
    this.createForm.reset(tur);
    this.panelOpenState = true;
    window.scroll(0, 0);
  }
  ochirish(tur: number) {
    this.tozalash();
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      maxWidth: "400px",
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.requestService.deleteById(tur).subscribe(
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
  tozalash() {
    this.createForm.reset();
    this.tahrirRejim = false;
    this.sorovBajarilmoqda = false;
    this.panelOpenState = false;
  }
}
