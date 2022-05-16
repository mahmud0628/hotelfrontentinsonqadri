import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '@coreui/angular';

@Component({
  selector: 'app-myfooter',
  templateUrl: './myfooter.component.html',
  styleUrls: ['./myfooter.component.scss']
})
export class MyfooterComponent extends FooterComponent implements OnInit {

  constructor() { 
    super();
  }

  ngOnInit(): void {
  }

}

