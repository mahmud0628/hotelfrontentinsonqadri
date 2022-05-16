import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Mahalla } from '../shared/model/mahalla';
import { MahallaService } from '../shared/service/mahalla.service';
import { INavData } from '@coreui/angular';

@Component({
  selector: 'app-mahalla',
  templateUrl: './mahalla.component.html',
  styleUrls: ['./mahalla.component.scss']
})
export class MahallaComponent implements OnInit {
  navItems: INavData[] = [
    {
      name: 'Bosh sahifa',
      url: '/dashboard',
      iconComponent: { name: 'cil-home' },
      // badge: {
      //   color: 'info',
      //   text: 'NEW'
      // }
    },
    {
      title: true,
      name: "Bo'limlar"
    },
  
    {
      name: 'Arizalar',
      url: 'request',
      iconComponent: { name: 'cil-pen' }
    },
    {
      name: 'Xodimlar',
      url: 'xodim',
      iconComponent: { name: 'cil-user' }
    },
    {
      name: 'Subyektlar',
      url: 'subject',
      iconComponent: { name: 'cil-institution' }
    },
    {
      name: 'Elonlar',
      url: 'elon',
      iconComponent: { name: 'cil-envelope-closed' }
    },
    {
      name: 'Aloqa',
      url: 'chat',
      iconComponent: { name: 'cil-comment-bubble' }
    },
    {
      name: 'Online Mahalla',
      url: 'https://www.online-mahalla.uz/login ',

      iconComponent: { name: 'cil-external-link' }
    },
   
  ];
  ;


  public perfectScrollbarConfig = {
    suppressScrollX: true,
  };
  mahallaId!: number;
  mahalla!: Mahalla;
  constructor(private activatedRoute: ActivatedRoute,
    private mahallaService:MahallaService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(data=>{
      if(data && data['id']){
        this.mahallaId = data['id'];
        this.loadMahalla();
      }
    })
  }
  loadMahalla() {
    this.mahallaService.getById(this.mahallaId).subscribe(mahalla=>{
      this.mahalla = mahalla;
      this.init();
    },
    error=>{
      setTimeout(this.loadMahalla, 1000);
    });
    
  }
  init() {
   // TODO mahallaga oid xabarlar o'qib kelinadi

  }

}
