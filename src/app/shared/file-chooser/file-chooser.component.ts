import { AfterContentInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-file-chooser',
  templateUrl: './file-chooser.component.html',
  styleUrls: ['./file-chooser.component.scss']
})
export class FileChooserComponent implements OnInit {
  selectedFile: any;
  newChoose = false;
  @Input("address") address!: string;
  @Output() selectFile: EventEmitter<any> = new EventEmitter();
  constructor( private dialog: MatDialog) { }
  ngOnInit(): void {
    console.log("file chooser", this.address);
    
  }
  openWindow(event: any){
    this.address = "";
    this.selectedFile = event.target.files[0];
    if(this.newChoose){
      this.newChoose = false;
    }else{
      this.newChoose = true;
    }
  }
}
