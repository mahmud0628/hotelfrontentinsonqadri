import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClassToggleService, HeaderComponent } from '@coreui/angular';

@Component({
  selector: 'app-myheader',
  templateUrl: './myheader.component.html',
  styleUrls: ['./myheader.component.scss']
})
export class MyheaderComponent extends HeaderComponent  implements OnInit {

  @Input() sidebarId: string = "sidebar";

  public newMessages = new Array(4)
  public newTasks = new Array(5)
  public newNotifications = new Array(5)

  constructor(private classToggler: ClassToggleService, private router: Router) {
    super();
  }
  ngOnInit(): void {
  }
  logout(){
    
    this.router.navigate(['/login']);
  }
}
