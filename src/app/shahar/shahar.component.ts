import { Component, NgModule, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-shahar',
  templateUrl: './shahar.component.html',
  styleUrls: ['./shahar.component.scss']
})
export class ShaharComponent implements OnInit {

  lat: number = 51.678418;
  lng: number = 7.809007;

  constructor() { }

  ngOnInit(): void {
  }


}
