import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { DeleteDialogComponent } from 'src/app/shared/dialogs/delete-dialog/delete-dialog.component';
import { Bino } from 'src/app/shared/model/bino';
import { Xona } from 'src/app/shared/model/xona';
import { BinoService } from '../../../shared/service/bino.service';
import { XonaService } from '../../../shared/service/xona.service';

@Component({
  selector: 'app-xona',
  templateUrl: './xona.component.html',
  styleUrls: ['./xona.component.scss']
})
export class XonaComponent implements OnInit, AfterViewInit {

  panelOpenState = false;
  displayedColumns: string[] = ['id', 'sigim', 'isLux', 'narx', 'status', 'amal'];

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;

  pageSize = 10;
  xonas!: Xona[];;
  binos!: Bino[];
  tahrirRejim = false;
  sort = 'id';
  sortType = 'asc'
  sorovBajarilmoqda = false;

  createForm: any;


  constructor(
    public binoService: BinoService,
    public xonaService: XonaService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {

  }


  ngOnInit(): void {
    this.createForm = this.formBuilder.group({
      id: [{ value: '', disabled: true }],
      sigim: [null, Validators.required],
      isLux: [''],
      bino: [''],
      narx: [''],
      status: ['']

    });
  }


  ngAfterViewInit(): void {
    this.isLoadingResults = false;
    this.isRateLimitReached = false;
    this.xonaService.getAll(this.pageSize).subscribe((data: any) => {
      this.xonas = data.content;
      console.log(data.content);
      
    })

    this.binoService.getAll(this.sort + ',' + this.sortType).subscribe(
      (success: any) => {
        this.binos = success.content;
        console.log(success.content);

      }
    )
  }
  save(): void {
    const kassa = this.createForm.getRawValue();
    this.sorovBajarilmoqda = true;
    console.log(kassa);
    if (this.tahrirRejim) {
      this.xonaService.update(kassa).subscribe(
        (success) => {
          this.createForm.reset();
          this.tahrirRejim = false;
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
        },

      );
    } else {

      this.xonaService.create(kassa).subscribe(
        () => {

          this.createForm.reset();
          this._snackBar.open("Xona muvaffaqiyatli qo'shildi!", "", {
            duration: 1000,
            verticalPosition: 'top',
            panelClass: 'notif-success'

          });
          this.sorovBajarilmoqda = false;
        },
        (error) => {
          let message = "Xatoli ro'y berdi";
          console.log(error);

          if (error.message) {
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


  edit(xona: Xona) {
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
        this.xonaService.deleteById(id).subscribe(
          () => {

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