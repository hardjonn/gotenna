import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  @Input()
  isHandset: boolean;

  @Input()
  userIsLoggedIn: boolean;

  @Input()
  drawer: MatSidenav;

  @Output()
  logout = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {}

  onLogout() {
    this.logout.emit();
  }
}
