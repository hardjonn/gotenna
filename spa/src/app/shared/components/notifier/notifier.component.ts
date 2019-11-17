import { Component, OnInit, Inject, EventEmitter, Output } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material';

import { UiNotifierTypes } from '@core/models';

@Component({
  selector: 'app-notifier',
  templateUrl: './notifier.component.html',
  styleUrls: ['./notifier.component.scss'],
})
export class NotifierComponent implements OnInit {
  public notifierType = UiNotifierTypes;

  @Output()
  dismissEvent = new EventEmitter<any>();

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {}

  ngOnInit() {}

  onDismissClicked() {
    this.dismissEvent.emit();
  }
}
