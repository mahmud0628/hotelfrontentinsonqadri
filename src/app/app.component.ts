import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { IconSetService } from '@coreui/icons-angular';
import { iconSubset } from './icons/icon-subset';
import { Title } from '@angular/platform-browser';
import {AccountService} from "./core/account.service";
import {JwtUtil} from "./core/jwt.util";
import { Lavozim } from './shared/model/lavozimlar';
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'body',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {
  title = 'HOTEL.UZ BOSHQARUV';

  constructor(
    private router: Router,
    private titleService: Title,
    private iconSetService: IconSetService,
    private accountService: AccountService,
     private jwtUtil: JwtUtil
  ) {
    titleService.setTitle(this.title);
    // iconSet singleton
    iconSetService.icons = { ...iconSubset };
  }



  ngOnInit(): void {

    if (this.accountService.hasAnyAuthority([Lavozim.ADMIN, Lavozim.HOKIM, Lavozim.SUPER_ADMIN])) {
      this.router.navigate(['/admin']);
    } else if (this.accountService.hasAnyAuthority([Lavozim.MAHALLA])) {
      this.accountService.identity().subscribe(user => {
        this.router.navigate(['/mahalla', user?.territory])
      })
    }

    // this.router.events.subscribe(event => {
    //   if (event instanceof NavigationEnd) {


    //     for (let s of this.scripts) {
    //       if (document.getElementById(s.id) != null) {
    //         document.getElementById(s.id)?.remove();
    //       }
    //       const node = document.createElement('script');
    //       node.src = s.path;
    //       node.type = 'text/javascript';
    //       node.async = false;
    //       node.id = s.id;
    //       node.charset = 'utf-8';
    //       document.getElementsByTagName('body')[0].appendChild(node);
    //     }


    //   }
    // });
  // }
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
    });
  }
}
