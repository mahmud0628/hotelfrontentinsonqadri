import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { INavData } from '@coreui/angular';
import { __extends } from 'tslib';

 
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  navItems: INavData[] = [
    {
      name: 'Bosh sahifa',
      url: 'viloyat',
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
      name: 'Binolar',
      url: 'bino',
      iconComponent: { name: 'cil-institution' }
    },
    {
      name: 'Xonalar',
      url: 'xona',
      iconComponent: { name: 'cil-home' }
    },
    {
      name: 'Xodimlar',
      url: 'xodim',
      iconComponent: { name: 'cil-home' }
    },
    {
      name: 'Mijozlar',
      url: 'mijoz',
      iconComponent: { name: 'cil-home' }
    },
    {
      name: 'Buyurtmalar',
      url: 'buyurtma',
      iconComponent: { name: 'cil-home' }
    },
    {
      name: 'Tulovlar',
      url: 'tulov',
      iconComponent: { name: 'cil-home' }
    },
    {
      name: 'Tashkilotlar',
      url: 'tashkilot',
      iconComponent: { name: 'cil-institution' }
    },
    
    {
      name: 'Aloqa',
      url: 'chat',
      iconComponent: { name: 'cil-comment-bubble' }
    },

    {
      name: 'Xaritadan qidiruv',
      url: 'https://earth.google.com/web/search/Qashqadaryo+Viloyati/@38.77339146,66.00680191,419.6676068a,464024.27480794d,35y,0h,0t,0r/data=Cn8aVRJPCiUweDNmNGMwZjczM2VmMzc4NGY6MHhhZDg5Nzc0NzQ2NDBiMGU3GQ_37BQGc0NAIb1DQHT3glBAKhRRYXNocWFkYXJ5byBWaWxveWF0aRgCIAEiJgokCefCIVL0HDVAEebCIVL0HDXAGVMm-3r_wklAIVIm-3r_wknA',

      iconComponent: { name: 'cil-external-link' }
    }

  
  ];

  public perfectScrollbarConfig = {
    suppressScrollX: true, 
  };
  constructor( private router: Router) { }

  ngOnInit(): void {
    
  }

}
