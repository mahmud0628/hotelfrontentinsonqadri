import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { DeleteDialogComponent } from 'src/app/shared/dialogs/delete-dialog/delete-dialog.component';
import { Xodim } from 'src/app/shared/model/xodim';

import { XodimService } from 'src/app/shared/service/xodim.service';
@Component({
  selector: 'app-xodim',
  templateUrl: './xodim.component.html',
  styleUrls: ['./xodim.component.scss']
})


export class XodimComponent implements OnInit {

  panelOpenState = false;
  displayedColumns: string[] = ['id','pasportId','ism','familiya','jins','boshVaqt','tugashVaqt','amal'];

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;

  pageSize = 10;
  xodimlar!:Xodim[];
  tahrirRejim = false;
  sort = 'id';
  sortType = 'asc'
  sorovBajarilmoqda = false;

  createForm:any;

  constructor(
    public xodimService: XodimService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.createForm = this.formBuilder.group({
      id: [{ value: '', disabled: true}],
      pasportId: [null, Validators.required],
      ism:[null, Validators.required],
      familiya:[null, Validators.required],
      jins:[''],
      boshVaqt:[''],
      tugashVaqt:['']
     

    })

  }
  ngAfterViewInit(): void {
    this.isLoadingResults = false;
    this.isRateLimitReached = false;
     this.xodimService.getAll(this.pageSize).subscribe(
       (data:any)=>{
       this.xodimlar = data.content;
     })

    }
    save():void{
      const xodim = this.createForm.getRawValue();
      this.sorovBajarilmoqda = true;
      console.log(xodim);
      if(this.tahrirRejim){
        this.xodimService.update(xodim).subscribe(
          (success)=>{
              this.createForm.reset();
              this.tahrirRejim = false;
              this.sorovBajarilmoqda = false;
             this.ngAfterViewInit();    
          },
          (error)=>{

            let message  = "Xatoli ro'y berdi";
            console.log(error);

            if(error.error.message){
              message = error.error.message;
            }
            this._snackBar.open(message, 'X',  {
               duration: 4000,
            verticalPosition: 'bottom',

            });
             this.sorovBajarilmoqda = false;
          },

        );
      } else {

      this.xodimService.create(xodim).subscribe(
        ()=>{
            this.createForm.reset();
            this._snackBar.open("Bino muvaffaqiyatli qo'shildi!", "", {
              duration: 1000,
           verticalPosition: 'top',
           panelClass: 'notif-success'

       });
       this.ngAfterViewInit();
       this.sorovBajarilmoqda = false;
        },
        (error)=>{
          let message  = "Xatoli ro'y berdi";
          console.log(error);

      if(error.error.message){
            message = error.error.message;
          }
          this._snackBar.open(message, 'X',  {
             duration: 4000,
          verticalPosition: 'bottom',
      });
      this.sorovBajarilmoqda = false;
        }

      );
      }

    }

    edit(xodim:Xodim){
      this.tahrirRejim = true;
      this.createForm.reset(xodim);
      this.panelOpenState = true;
      window.scroll(0,0);

    }
    ochirish(id:number){

      this.tozalash();
      // const message = Siz rostdan ham ushbu  o'chirmoqchimisiz?;

      // const dialogData = new ConfirmDialogModel("O'chirish", message);
      const dialogRef = this.dialog.open(DeleteDialogComponent,{
        maxWidth: "400px",
        // data: dialogData
      });

      dialogRef.afterClosed().subscribe(dialogResult => {
        if(dialogResult){
          this.xodimService.deleteById(id).subscribe(
            (success:any)=>{
              this.ngAfterViewInit();
            },
            (error)=>{
                console.log(error);
            }
          );
        };
      });
    }
 
    tozalash(){
      this.createForm.reset();
      this.tahrirRejim = false;
      this.sorovBajarilmoqda = false;
      this.panelOpenState = false;
    }

    saralash(sort:string){
      if(this.sort == sort){
        if(this.sortType=='asc'){
          this.sortType = 'desc';
        } else {
          this.sortType = 'asc';
        }

      } else {
        this.sortType = 'asc';
        this.sort = sort;
      }
      this.sort = sort;
    }

}
