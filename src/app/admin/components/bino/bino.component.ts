import { AfterViewInit, Component,  OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { DeleteDialogComponent } from 'src/app/shared/dialogs/delete-dialog/delete-dialog.component';

import { Bino } from 'src/app/shared/model/bino';
import { BinoService } from '../../../shared/service/bino.service';

@Component({
  selector: 'app-bino',
  templateUrl: './bino.component.html',
  styleUrls: ['./bino.component.scss']
})
export class BinoComponent implements OnInit, AfterViewInit {

    panelOpenState = false;
    displayedColumns: string[] = ['id', 'nom','manzil','amal'];


    resultsLength = 0;
    isLoadingResults = true;
    isRateLimitReached = false;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) matSort!: MatSort;



    pageSize = 10;
    binolar!:Bino[];
    tahrirRejim = false;
    sort = 'id';
    sortType = 'asc'
    sorovBajarilmoqda = false;

    createForm:any;


    constructor(
      public binoService: BinoService,
      private formBuilder: FormBuilder,
      public dialog: MatDialog,
      private _snackBar: MatSnackBar
      ) {

     }

    ngOnInit(): void {
      this.createForm = this.formBuilder.group({
        id: [{ value: '', disabled: true}],
        nom: [null, Validators.required],
       manzil:['']
      });
    }


    ngAfterViewInit(): void {
      this.isLoadingResults = false;
      this.isRateLimitReached = false;
       this.binoService.getAll(this.pageSize).subscribe(
         (data:any)=>{
         this.binolar = data.content;
       })

      
      }
    save():void{
      const kassa = this.createForm.getRawValue();
      this.sorovBajarilmoqda = true;
      console.log(kassa);
      if(this.tahrirRejim){
        this.binoService.update(kassa).subscribe(
          (success)=>{
              this.createForm.reset();
              this.tahrirRejim = false;
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
          },

        );
      } else {

      this.binoService.create(kassa).subscribe(
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


    edit(bino:Bino){
      this.tahrirRejim = true;
      this.createForm.reset(bino);
      this.panelOpenState = true;
      window.scroll(0,0);

    }
   
      ochirish(bino:number){

        this.tozalash();
        // const message = `Siz rostdan ham ushbu mahsulot turni o'chirmoqchimisiz?`;
  
        // const dialogData = new ConfirmDialogModel("O'chirish", message);
  
        const dialogRef = this.dialog.open(DeleteDialogComponent, {
          maxWidth: "400px",
          // data: dialogData
        });
  
        dialogRef.afterClosed().subscribe(dialogResult => {
          if(dialogResult){
            this.binoService.deleteById(bino).subscribe(
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