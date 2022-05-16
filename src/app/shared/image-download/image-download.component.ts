import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImageDownloadService } from './image-download.service';

@Component({
  selector: 'app-image-download',
  templateUrl: './image-download.component.html',
  styleUrls: ['./image-download.component.scss']
})
export class ImageDownloadComponent implements OnInit {

  @Input("faylId") falyId!: number;
  @Input("fayl") fayl!: any;
  @Input("file") file!: Blob;
  @Input("width") width = 100;
  @Input("height") height = 100;
  @Input("shakl") shakl!: string;
  @ViewChild('img') image!: ElementRef;
 
  isShowable = false;
  constructor(private imageDownloadService: ImageDownloadService,
    private activeRoute:ActivatedRoute) { }
  ngAfterViewInit(): void {
    this.activeRoute.paramMap.subscribe(data =>{
      this.downloadFile();    
    });
  }

  downloadFile(){
    if (this.fayl)
      this.imageDownloadService.download(this.fayl).subscribe(
        (data) => {
          const f = new File([data], "fayl") ;
          let reader = new FileReader();           
          reader.onload = (e: any) => {
              let imgBase64Path = e.target.result;
              if (this.image) {
                this.image.nativeElement.src = imgBase64Path;
              }
          };
          reader.readAsDataURL(f); 
          this.file = data;
        }
      )
  }
  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe(data =>{
      this.downloadFile();    
    });
  }

}
