import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { INavData } from '@coreui/angular';
import { __extends } from 'tslib';
import { ViloyatService } from '../shared/service/viloyat.service'

 
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
      name: 'Online Mahalla',
      url: 'https://www.online-mahalla.uz/login ',

      iconComponent: { name: 'cil-external-link' }
    },

    {
      name: 'Tadbirkor kutubxonasi',
      url: 'books',

      iconComponent: { name: 'cil-external-link' }
    } ,
 
    {
      name: 'Prezident asarlari',
      url: 'asar',

      iconComponent: { name: 'cil-external-link' }
    } , 

    {
      name: 'Xaritadan qidiruv',
      url: 'https://earth.google.com/web/search/Qashqadaryo+Viloyati/@38.77339146,66.00680191,419.6676068a,464024.27480794d,35y,0h,0t,0r/data=Cn8aVRJPCiUweDNmNGMwZjczM2VmMzc4NGY6MHhhZDg5Nzc0NzQ2NDBiMGU3GQ_37BQGc0NAIb1DQHT3glBAKhRRYXNocWFkYXJ5byBWaWxveWF0aRgCIAEiJgokCefCIVL0HDVAEebCIVL0HDXAGVMm-3r_wklAIVIm-3r_wknA',

      iconComponent: { name: 'cil-external-link' }
    }

  
  ];

  public perfectScrollbarConfig = {
    suppressScrollX: true, 
  };
  constructor(private viloyatSerive: ViloyatService, private router: Router) { }

  ngOnInit(): void {
    this.viloyatSerive.getAllFull().subscribe((data: any) => {
      if (data && data[0]) {
        let viloyatlar: any[] = [{
          title: true,
          name: 'Hududlar',
        }];
        for (let v of data) {
          let tumanlar = [
           
          ];
          for (let t of v.tumans) {
            let sektorlar = [];
            for (let s of t.sektors) {
              let mahallalar = [];
              for (let m of s.mahallas) {
                mahallalar.push({
                  name: m.name,
                  url: 'mahalla-stat/' + m.id,
                  iconComponent: { name: 'cil-industry' },

                })
              }
              sektorlar.push({
                name: s.name,
                url: "sektors/" + s.id,
                iconComponent: { name: 'cil-institution' },
                children: mahallalar
              });
            }
            tumanlar.push({
              name: t.name,
              url: "shahar/"+t.id,
              iconComponent: { name: 'cil-house' },
              children: sektorlar
            })

          }
          viloyatlar.push({
            
            name: v.name,
            url: 'viloyat/' + v.id,
            iconComponent: { name: 'cil-home' },
            // children: tumanlar,
            attributes: {
              onClick: (e: any) => {
                console.log('ishladi');
                
                e.preventDefault();
                e.stopPropagation();
                this.router.navigate(['viloyat', v.id])
              }
            }
          })
        }
        this.navItems = [...this.navItems, ...viloyatlar];


      }
    })
  }

}
