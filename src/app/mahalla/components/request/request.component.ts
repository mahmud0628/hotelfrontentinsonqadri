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
import { RequestService } from './request.service';
import { Sektor } from 'src/app/shared/model/sektor';
import { Mahalla } from 'src/app/shared/model/mahalla';
import { MahallaService } from 'src/app/shared/service/mahalla.service';
import { SektorService } from 'src/app/shared/service/sektor.service';
import { TumanService } from 'src/app/shared/service/tuman.service';
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
  displayedColumns: string[] = ['id', 'title', 'status', 'tashkilot', 'time', 'type','media','amal'];
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
    public mahallaService:MahallaService,
    public tumanService:TumanService,
    public sektorService:SektorService
  ) {
  }
 
  openDialogVideo(media: SavedFile,text:string) {
    // this.tozalash();
    const dialogRef = this.dialog.open(MediaViewComponent, {
      maxWidth: "80vw",
      data: {
        media
      }
    });
    
      
  }

  ngOnInit(): void {
  
    
  }
  ngAfterViewInit(): void {
  
    this.isRateLimitReached = false;
    const pageable = {
      size: this.pageValue,
      page: this.page
    }
    
    this.requestService.getAll().subscribe((data: any) => {
      this.request = data;
      this.isLoadingResults = false;
      this.length = data.totalElements;

      console.log(data);
    });

  }

  pageClick() {
    const pageable = {
      size: this.paginator?.pageSize,
      page: this.paginator?.pageIndex
    }
    this.requestService.getAll().subscribe((data: any) => {
      this.request = data.content;


    });
  }

  ochirish(tur: number) {
    // this.tozalash();
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
 

}