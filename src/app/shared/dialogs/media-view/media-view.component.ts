import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-media-view',
  templateUrl: './media-view.component.html',
  styleUrls: ['./media-view.component.scss']
})
export class MediaViewComponent implements OnInit {
  mazmun:any;
  name:any;
 url = environment.baseUrl + "/api/file/";
 //"http://asilmedia.net/redirect/fayllar3.php?url=http://fayllar1.ru/20/kinolar/3 rang qizil 480p O'zbek tilida (asilmedia.net).mp4";
  constructor( @Inject(MAT_DIALOG_DATA) public data:any) { 
  
    this.mazmun=data.media.text;
  this.name=data.media.files;
    let id =data.media.files;
    this.url += id; 
  }

  ngOnInit(): void {
    console.log(this.data.media.files);
    console.log(this.data);
 
    
  }

}
