import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {Xodim} from 'src/app/shared/model/xodim';
import { HodimService } from '../xodim/hodim.service'
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { catchError, map, merge, of, startWith, switchMap } from 'rxjs';


@Component({
  selector: 'app-xodim',
  templateUrl: './xodim.component.html',
  styleUrls: ['./xodim.component.scss']
})
export class XodimComponent implements OnInit ,AfterViewInit {



    selectedStatus!: string;
    public toggleForm1!: boolean;
  
    displayedColumns: string[] = ['id', 'fullName', 'phone', 'description', 'photoId' , 'amal'];
    dataSource: MatTableDataSource<Xodim>;
    data: Xodim[] = [];
    key = '';
    resultsLength = 0;
    isLoadingResults = true;
    isRateLimitReached = false;
    forma: any;
    tahrir = false;
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    filteredCustomerList: any;
    customerList: any;
  xodims!:Xodim[]
   
  
  
    constructor(private xodimServie: HodimService,
      public fb: FormBuilder, private dialog: MatDialog) {
  
      this.dataSource = new MatTableDataSource();
    }
  
  
  
   
    ngOnInit(): void {
      this.forma = this.fb.group({
  
        'jins': new FormControl(),
        id: [''],
        fullName: [''],
        phone: [''],
        description: [''],
        photoId: ['']
  
      })
      this.selectedStatus = "";
    }
  
    ngAfterViewInit() {
      this.xodimServie.getAll().subscribe((data:any)=>
      {
        this.xodims=data;
      })
  
      // If the user changes the sort order, reset back to the first page.
      this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
      merge(this.sort.sortChange, this.paginator.page)
        .pipe(
          startWith({}),
          switchMap(() => {
            this.isLoadingResults = true;
  
            let pageable = {
              key: this.key,
              size: this.paginator.pageSize,
              sort: this.sort.active + "," + this.sort.direction,
              page: this.paginator.pageIndex
            }
  
            return this.xodimServie.getAll()
              .pipe(catchError(() => of(null)));
          }),
          map((data: any) => {
  
            this.isLoadingResults = false;
            this.isRateLimitReached = data === null;
  
            if (data === null) {
              return [];
            }
  
            this.resultsLength = data.totalElements;
            return data.content;
          })
        ).subscribe(data => this.data = data);
    }
  
  
  
    qidirish(event: any) {
      const filterField = event.target.value;
       console.log(event.target.value);
       
      if (filterField) {
        this.key = filterField;
      } else {
        this.key = "";
        
      }
      this.sort.sortChange.next(this.sort);
    }
  
  
  
  
    saqlash() {
      const xodimlar = this.forma.getRawValue();
      this.xodimServie.create(xodimlar).subscribe(data => {
        this.key = "";
        this.forma.reset();
        this.sort.sortChange.next(this.sort);
      })
    }
  
    edit(xodim: any) {
      this.forma.reset(xodim);
      this.tahrir = true;
      
      
  
    }
  
  
    delete(row: any) {
      
    
        
            this.xodimServie.deleteById(row.id).subscribe(() => {
              this.sort.sortChange.next(this.sort);
            })
          }
       
    }
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  


