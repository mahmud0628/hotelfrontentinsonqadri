import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-elon',
  templateUrl: './elon.component.html',
  styleUrls: ['./elon.component.scss']
})
export class ElonComponent implements OnInit {
 

  
   
  members: {title: string, subtitle: string, url: string}[] = [
    {title: 'Sotuvchi', subtitle: 'Bo\'sh ish o\'rni', url: 'https://images.pexels.com/photos/696205/pexels-photo-696205.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'},
    {title: 'Sartaroshxona', subtitle: 'bo\'sh ish o\'rni',  url: 'https://avatars.mds.yandex.net/get-altay/1974402/2a0000016fac1c26893851c6ed611dfdc39a/L'},
    {title: 'Bo\'sh bino', subtitle: 'Sotiladi',  url: 'https://static.zarnews.uz/crop/b/b/720__80_bb41bdc07f356e5bba8957ced3941510.jpg?img=self&v=1589022541'}


    // {title: 'Title', subtitle: 'Subtitle',  url: 'https://material.angular.io/assets/img/examples/shiba2.jpg'},
    // {title: 'Title', subtitle: 'Subtitle',  url: 'https://material.angular.io/assets/img/examples/shiba2.jpg'},
    // {title: 'Title', subtitle: 'Subtitle',  url: 'https://material.angular.io/assets/img/examples/shiba2.jpg'},
   
  ];




  







  slides: any[] = new Array(3).fill({id: -1, src: '', title: '', subtitle: ''});

  constructor() { }

  ngOnInit(): void {
    this.slides[0] = {
      id: 0,
      src: '/assets/pexels-magazin.jpg',
      title: "Yangi do'kon",
      subtitle: 'Mahallada yangi savdo majmuasi'
    };
    this.slides[1] = {
      id: 1,
      src: '/assets/pexels-svarchik.jpg',
      title: 'Ikkinchi',
      subtitle: 'Payvandchi ishga olamiz'
    }
    this.slides[2] = {
      id: 2,
      src: '/assets/pexels-qorovul.jpg',
      title: '3 rasm',
      subtitle: 'Qorovul kerak'
    }
  }
}
