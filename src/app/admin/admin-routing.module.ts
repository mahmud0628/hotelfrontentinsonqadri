import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { UserComponent } from './components/user/user.component';
import { BinoComponent } from './components/bino/bino.component';
import { XonaComponent } from './components/xona/xona.component';
import { XodimComponent } from './entitiy/xodim/xodim.component';
import { MijozComponent } from './entitiy/mijoz/mijoz.component';
import { BuyurtmaComponent } from './entitiy/buyurtma/buyurtma.component';
import { TulovComponent } from './entitiy/tulov/tulov.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'admin/viloyat'
      },
      {
        path: 'bino',
        component: BinoComponent
      },
      {
        path: 'xona',
        component: XonaComponent
      },
      {
        path: 'xodim',
        component: XodimComponent
      },
      {
        path: 'mijoz',
        component: MijozComponent
      },
      {
        path: 'buyurtma',
        component: BuyurtmaComponent
      },
      {
        path: 'tulov',
        component: TulovComponent
      },
      {
        path: 'user',
        component: UserComponent
      },
   

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
