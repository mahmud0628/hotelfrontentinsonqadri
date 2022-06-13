import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { Mijoz } from 'src/app/shared/model/mijoz';
import { Xodim } from 'src/app/shared/model/xodim';
import { Xona } from 'src/app/shared/model/xona';
import { MijozService } from 'src/app/shared/service/mijoz.service';
import { XodimService } from 'src/app/shared/service/xodim.service';
import { XonaService } from 'src/app/shared/service/xona.service';
import { BuyurtmaService } from 'src/app/shared/service/buyurtma.service';
import { DeleteDialogComponent } from 'src/app/shared/dialogs/delete-dialog/delete-dialog.component';
import { Buyurtma } from 'src/app/shared/model/buyurtma';

@Component({
  selector: 'app-buyurtma',
  templateUrl: './buyurtma.component.html',
  styleUrls: ['./buyurtma.component.scss']
})
export class BuyurtmaComponent implements OnInit {

  panelOpenState = false;
  displayedColumns: string[] = ['id', 'xona','xodim', 'mijoz','buyurtmaYaratilganVaqt','buyurtmaYopilganVaqt', 'amal'];

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;

  pageSize = 10;
  buyurtmalar:Buyurtma[]=[];
  xonalar: Xona[]=[];
  xodimlar: Xodim[]=[];
  mijozlar: Mijoz[]=[];
  tahrirRejim = false;
  sort = 'id';
  sortType = 'asc'
  sorovBajarilmoqda = false;

  createForm: any;
  constructor(
    public buyurtmaService:BuyurtmaService,
    public xodimService:XodimService,
    public mijozService: MijozService,
    public xonaService: XonaService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.createForm = this.formBuilder.group({
      id: [{ value: '', disabled: true }],
      xona: [null, Validators.required],
      xodim: [null, Validators.required],
      mijoz: [null, Validators.required],
      buyurtmaYaratilganVaqt: [''],
      buyurtmaYopilganVaqt: ['']

    });
  }

  ngAfterViewInit(): void {
    this.isLoadingResults = false;
    this.isRateLimitReached = false;
    this.buyurtmaService.getAll(this.pageSize).subscribe((success: any) => {
      this.buyurtmalar = success.content;
      console.log(success.content);this.pageSize
      
    })

    this.xonaService.getAll(this.pageSize).subscribe(
      (data:any)=>{
        this.xonalar=data.content;
      }
    )

    this.xodimService.getAll(this.pageSize).subscribe(
      (data:any)=>{
        this.xodimlar=data.content;
      }
    )
    this.mijozService.getAll(this.pageSize).subscribe(
      (data:any)=>{
        this.mijozlar=data.content;
      }
    )
      
    
  }
  save(): void {
    const kassa = this.createForm.getRawValue();
    this.sorovBajarilmoqda = true;
    console.log(kassa);
    if (this.tahrirRejim) {
      this.buyurtmaService.update(kassa).subscribe(
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

      this.buyurtmaService.create(kassa).subscribe(
        ()=>{
          this.createForm.reset();
          this._snackBar.open("Xona muvaffaqiyatli qo'shildi!", "", {
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


  edit(xona: Buyurtma) {
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
        this.buyurtmaService.deleteById(id).subscribe(
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
