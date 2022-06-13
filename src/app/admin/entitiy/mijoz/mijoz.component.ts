import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { DeleteDialogComponent } from 'src/app/shared/dialogs/delete-dialog/delete-dialog.component';
import { Mijoz } from 'src/app/shared/model/mijoz';
import { MijozService } from 'src/app/shared/service/mijoz.service';

@Component({
  selector: 'app-mijoz',
  templateUrl: './mijoz.component.html',
  styleUrls: ['./mijoz.component.scss']
})
export class MijozComponent implements OnInit {

  panelOpenState = false;
  displayedColumns: string[] = ['id','pasportId','ism','familiya','jins','millati','amal'];

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;

  pageSize = 10;
  mijozlar!:Mijoz[];
  tahrirRejim = false;
  sort = 'id';
  sortType = 'asc'
  sorovBajarilmoqda = false;

  createForm:any;

  constructor(
    public mijozService: MijozService,
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
      millati:['']
     
    })
  }

  ngAfterViewInit(): void {
    this.isLoadingResults = false;
    this.isRateLimitReached = false;
     this.mijozService.getAll(this.pageSize).subscribe(
       (data:any)=>{
       this.mijozlar = data.content;
     })

    }
    save():void{
      const mijoz = this.createForm.getRawValue();
      this.sorovBajarilmoqda = true;
      console.log(mijoz);
      if(this.tahrirRejim){
        this.mijozService.update(mijoz).subscribe(
          (success)=>{
              this.createForm.reset();
              this.tahrirRejim = false;
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
          },

        );
      } else {

      this.mijozService.create(mijoz).subscribe(
        ()=>{
            this.createForm.reset();
            this._snackBar.open("Mijoz muvaffaqiyatli qo'shildi!", "", {
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

    edit(mijoz:Mijoz){
      this.tahrirRejim = true;
      this.createForm.reset(mijoz);
      this.panelOpenState = true;
      window.scroll(0,0);

    }
    ochirish(mijoz:number){

      this.tozalash();
      // const message = Siz rostdan ham ushbu  o'chirmoqchimisiz?;

      // const dialogData = new ConfirmDialogModel("O'chirish", message);
      const dialogRef = this.dialog.open(DeleteDialogComponent,{
        maxWidth: "400px",
        // data: dialogData
      });

      dialogRef.afterClosed().subscribe(dialogResult => {
        if(dialogResult){
          this.mijozService.deleteById(mijoz).subscribe(
            (success)=>{
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
