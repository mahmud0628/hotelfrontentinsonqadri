import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subject } from 'rxjs';
import { DeleteDialogComponent } from 'src/app/shared/dialogs/delete-dialog/delete-dialog.component';
import { Subjects } from 'src/app/shared/model/subjects';
import { Tuman } from 'src/app/shared/model/tuman';
import { FileService } from 'src/app/shared/service/file.service';
import { SubjectService } from './subject.service';


@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss']
})
export class SubjectComponent implements OnInit {

  csvInputChange(fileInputEvent: any) {
    console.log(fileInputEvent.target.files[0]);
  }
  // tashkilotlar!: Tashkilot[];
  @ViewChild("inputFile") inputFile!:ElementRef<any>;

  page: any = 0;
  pageValue: any = 20;
  panelOpenState = false;
  displayedColumns: string[] = ['id', 'name', 'address', 'description', 'phone','type'];
  sorovBajarilmoqda = false;
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  @ViewChild(MatPaginator) paginator!:MatPaginator;
  @ViewChild(MatSort) matSort!:MatSort;
  subjects!: Subjects[];
  tahrirRejim = false;
  createForm: any;
  activeCheck = false;
  length: any;
  constructor(
    public subjectService:SubjectService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private fileService: FileService
  ) {
  }
  ngOnInit(): void {
    this.createForm = this.formBuilder.group({
      id: [{ value: '', disabled: true }],
      name: [null, Validators.required],
      address: [null,Validators.required],
      description: [null],
      // photo:[null],
      phone: [null,Validators.required],
      type:[null,Validators.required]

    });
  }
  ngAfterViewInit(): void {
    this.isRateLimitReached = false;
    console.log("nima");
    const pageable = {
      size: this.pageValue,
      page: this.page
    }

    this.subjectService.getAll().subscribe((data: any) => {
      this.subjects = data;
      console.log(data);

      this.isLoadingResults = false;
      this.length = data.totalElements;
    });
  }

  pageClick() {
    const pageable = {
      size: this.paginator?.pageSize,
      page: this.paginator?.pageIndex
    }
    this.subjectService.getAll().subscribe((data: any) => {
      this.subjects = data;
    });
  }
  save(): void {
    const tur = this.createForm.getRawValue();
    this.sorovBajarilmoqda = true;
    let file = this.inputFile.nativeElement.files[0];
    console.log(file);
    // ariza.type = "CREDIT"
    // console.log(ariza);
    if (this.tahrirRejim) {
      this.subjectService.update(tur).subscribe(
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
      this.subjectService.create(tur).subscribe(
        (success: any) => {
          if (file)
            this.fileService.singleFileUpload(success.id, file).subscribe(data => {
              this.createForm.reset();
            });
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

  edit(tur: Tuman) {
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
        this.subjectService.deleteById(tur).subscribe(
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
