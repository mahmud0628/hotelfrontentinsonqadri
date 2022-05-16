import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatComponent } from './components/chat/chat.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ElonComponent } from './components/elon/elon.component';
import { RequestComponent } from './components/request/request.component';
import { SubjectComponent } from './components/subject/subject.component';
import { XodimComponent } from './components/xodim/xodim.component';
import { MahallaComponent } from './mahalla.component';

const routes: Routes = [
  {
    path: '',
    component: MahallaComponent,
    children: [
        {
          path: '',
          redirectTo: 'dashboard'
        }, 
        {
          path: 'dashboard',
          component: DashboardComponent
        },
        {
          path: 'subject',
          component: SubjectComponent
        }, 

        {
          path: 'xodim',
          component: XodimComponent
        }, 
        {
          path: 'request',
          component: RequestComponent
        }, 
        {
          path: 'chat',
          component: ChatComponent
        }, 
        {
          path: 'elon',
          component: ElonComponent
        }, 
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MahallaRoutingModule { }
