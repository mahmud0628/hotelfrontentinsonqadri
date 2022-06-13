import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { DeleteDialogComponent } from 'src/app/shared/dialogs/delete-dialog/delete-dialog.component';
import { Buyurtma } from 'src/app/shared/model/buyurtma';
import { Tulov } from 'src/app/shared/model/tulov';
import { BuyurtmaService } from 'src/app/shared/service/buyurtma.service';
import { TulovService } from 'src/app/shared/service/tulov.service';

@Component({
  selector: 'app-tulov',
  templateUrl: './tulov.component.html',
  styleUrls: ['./tulov.component.scss']
})
export class TulovComponent implements OnInit {
  panelOpenState = false;
  displayedColumns: string[] = ['id','buyurtma','plastikTulov','naqdTulov','tulovVaqt','amal'];

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;

  pageSize = 10;
  tulovlar!:Tulov[];
  buyurtmalar!:Buyurtma[];
  tahrirRejim = false;
  sort = 'id';
  sortType = 'asc'
  sorovBajarilmoqda = false;

  createForm:any

  constructor(   
    public tulovService: TulovService,
    public buyutmaService:BuyurtmaService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.createForm = this.formBuilder.group({
      id: [{ value: '', disabled: true}],
      buyurtma: [null, Validators.required],
      plastikTulov:[null, Validators.required],
      naqdTulov:[null, Validators.required],
      tulovVaqt:['']
    })
  }

  ngAfterViewInit(): void {
    this.isLoadingResults = false;
    this.isRateLimitReached = false;
    this.tulovService.getAll(this.pageSize).subscribe((success: any) => {
      this.tulovlar = success.content;
      console.log(success.content);this.pageSize
      
    })

    this.buyutmaService.getAll(this.pageSize).subscribe(
      (data:any)=>{
        this.buyurtmalar=data.content;
      }
    )

  
      
    
  }
  save(): void {
    const tulov = this.createForm.getRawValue();
    this.sorovBajarilmoqda = true;
    console.log(tulov);
    if (this.tahrirRejim) {
      this.tulovService.update(tulov).subscribe(
        (success) => {
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
          this._snackBar.open(message, 'X', {
            duration: 4000,
            verticalPosition: 'bottom',

          });
          this.sorovBajarilmoqda = false;
        },

      );
    } else {

      this.tulovService.create(tulov).subscribe(
        ()=>{
          this.createForm.reset();
          this._snackBar.open("Tulov muvaffaqiyatli qo'shildi!", "", {
            duration: 1000,
            verticalPosition: 'top',
            panelClass: 'notif-success'

          });
          this.ngAfterViewInit();
          this.sorovBajarilmoqda = false;
        },
        (error) => {
          let message = "Xatoli ro'y berdi";
          console.log(error);

          if (error.error.message) {
            message = error.error.message;
          }
          this._snackBar.open(message, 'X', {
            duration: 4000,
            verticalPosition: 'bottom',


          });
          this.sorovBajarilmoqda = false;
        }

      );
    }

  }


  edit(xona: Tulov) {
    this.tahrirRejim = true;
    this.createForm.reset(xona);
    this.panelOpenState = true;
    window.scroll(0, 0);

  }
  ochirish(id: number) {

    this.tozalash();
    // const message = Siz rostdan ham ushbu  o'chirmoqchimisiz?;

    // const dialogData = new ConfirmDialogModel("O'chirish", message);

    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      maxWidth: "400px",
      // data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.tulovService.deleteById(id).subscribe(
          (success:any) => {
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


  saralash(sort: string) {
    if (this.sort == sort) {
      if (this.sortType == 'asc') {
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



