import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { UserComponent } from './components/user/user.component';
import { BinoComponent } from './components/bino/bino.component';
import { XonaComponent } from './components/xona/xona.component';

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
