import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DeleteDialogComponent } from 'src/app/shared/dialogs/delete-dialog/delete-dialog.component';
import { Tuman } from 'src/app/shared/model/tuman';
import { Types } from 'src/app/shared/model/types';
import { TumanService } from './tuman.service';

@Component({
  selector: 'app-tuman',
  templateUrl: './tuman.component.html',
  styleUrls: ['./tuman.component.scss']
})
export class TumanComponent implements OnInit {
  page:any=0;
  pageValue:any=20;
  panelOpenState = false;
  displayedColumns: string[] = ['id', 'name','viloyat','amal'];
  sorovBajarilmoqda = false;
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort ;
  tumans!:Tuman[];
  tahrirRejim = false;
  createForm: any;
  activeCheck = false;
  length:any;
  constructor(
    public tumanService:TumanService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog
  ) {
  }
  ngOnInit(): void {
    this.createForm = this.formBuilder.group({
      id: [{ value: '', disabled: true }],
      name: [null, Validators.required],
      viloyat: [null]
    });
  }
  ngAfterViewInit(): void {
    this.isRateLimitReached = false;
    console.log("nima");
    const pageable = {
      size: this.pageValue,
      page: this.page
    }  
    
    this.tumanService.getAll().subscribe((data:any)=>{
        this.tumans = data; 
        console.log(data);
        
        this.isLoadingResults=false;
        this.length=data.totalElements;
      });
  }
  
  pageClick(){
    const pageable = {
       size: this.paginator?.pageSize,
       page: this.paginator?.pageIndex
     }
     this.tumanService.getAll().subscribe((data:any)=>{
      this.tumans = data; 
    });
   }
  save(): void {
    const tur = this.createForm.getRawValue();
    this.sorovBajarilmoqda = true;
    if (this.tahrirRejim) {
      this.tumanService.update(tur).subscribe(
        (success:any) => {
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
      this.tumanService.create(tur).subscribe(
        (success:any) => {
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

  edit(tur:Tuman){
    this.tahrirRejim = true;
    this.createForm.reset(tur);
    this.panelOpenState = true;
    window.scroll(0,0);
  }
  ochirish(tur:number){
    this.tozalash();
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      maxWidth: "400px",
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if(dialogResult){
        this.tumanService.deleteById(tur).subscribe(
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
}
