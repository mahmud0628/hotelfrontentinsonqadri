import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
 import { MatMenuModule } from '@angular/material/menu';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';


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

import { SharedModule as MySharedModule } from '../shared/shared.module';
import { PerfectScrollbarConfigInterface, PerfectScrollbarModule, PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { MyfooterComponent} from './components/myfooter/myfooter.component';
import { MyheaderComponent} from './components/myheader/myheader.component';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartjsModule } from '@coreui/angular-chartjs';
import { WidgetsModule } from '../views/widgets/widgets.module';
import { MaterialModule } from '../shared/material/material.module';
import { AdminRoutingModule } from './admin-routing.module'
import { BinoComponent } from '../admin/components/bino/bino.component';
import { ProfilComponent } from '../admin/components/profil/profil.component';
import { XonaComponent } from './components/xona/xona.component';

import { IconModule } from '@coreui/icons-angular';
import { RouterModule } from '@angular/router';

import { UserComponent } from './components/user/user.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    AdminComponent,
    MyfooterComponent,
    DashboardComponent,
    BinoComponent,
    XonaComponent,
    UserComponent,
    MyheaderComponent,
    ProfilComponent,
  


    // AccordionModule

  ],
  imports: [
    AdminRoutingModule,
    CommonModule,
    MatCardModule,
    MatMenuModule,
    IconModule,
    MySharedModule,
    MatExpansionModule,
    MatListModule,
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
    NavModule,

    TabsModule,
    CommonModule,
    GridModule,
    ProgressModule,
    ReactiveFormsModule,
    ButtonModule,
    FormModule,
    ButtonModule,
    ButtonGroupModule,
    ChartjsModule,
    AvatarModule,
    TableModule,
    WidgetsModule,
    CarouselModule,
    MaterialModule,
    FormsModule,
    RouterModule

  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
  ]
})
export class AdminModule { }
