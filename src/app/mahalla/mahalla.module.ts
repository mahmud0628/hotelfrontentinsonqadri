import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};


import {
  AvatarModule,
  BadgeModule,
  BreadcrumbModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  CarouselModule,
  DropdownModule,
  FooterModule,
  FormModule,
  GridModule,
  HeaderModule,
  ListGroupModule,
  NavModule,
  ProgressModule,
  SharedModule,
  SidebarModule,
  TableModule,
  TabsModule,
  UtilitiesModule,
} from '@coreui/angular';

import { IconModule } from '@coreui/icons-angular';

import { PerfectScrollbarConfigInterface, PerfectScrollbarModule, PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { MyheaderComponent } from './components/myheader/myheader.component';
import { MyfooterComponent } from './components/myfooter/myfooter.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ChartjsModule } from '@coreui/angular-chartjs';

import { WidgetsModule } from '../views/widgets/widgets.module';
import { MahallaComponent } from './mahalla.component';
import { SubjectComponent } from './components/subject/subject.component';

import { MahallaRoutingModule } from './mahalla-routing.module';
import {MaterialModule} from "./../shared/material/material.module";
import { TaminotchiComponent } from './components/taminotchi/taminotchi.component'
import { XodimComponent } from './components/xodim/xodim.component'
import { RequestComponent } from './components/request/request.component';

import { ChatComponent } from './components/chat/chat.component';
import { ElonComponent } from './components/elon/elon.component';
@NgModule({
  declarations: [
    MahallaComponent,
    MyheaderComponent,
    MyfooterComponent,
    DashboardComponent,
    SubjectComponent,
    TaminotchiComponent,
    XodimComponent,
    RequestComponent,
    ChatComponent,
    ElonComponent,

  ],
  imports: [
    CommonModule,
    MahallaRoutingModule,
    MaterialModule,
    AvatarModule,
    BadgeModule,
    BreadcrumbModule,
    ButtonGroupModule,
    ButtonModule,
    CardModule,
    DropdownModule,
    FooterModule,
    FormModule,
    GridModule,
    HeaderModule,
    ListGroupModule,
    NavModule,
    ProgressModule,
    SharedModule,
    SidebarModule,
    TabsModule,
    UtilitiesModule,
    PerfectScrollbarModule,
    CardModule,
        NavModule,
        IconModule,
        TabsModule,
        CommonModule,
        GridModule,
        ProgressModule,
        ButtonModule,
        FormModule,
        ButtonModule,
        ButtonGroupModule,
        ChartjsModule,
        AvatarModule,
        TableModule,
        WidgetsModule,
        MaterialModule,CarouselModule

 
    

   ],
    providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
     },
     ]
     })
export class MahallaModule { }
