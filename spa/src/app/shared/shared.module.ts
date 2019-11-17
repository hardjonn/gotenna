import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LayoutModule } from '@angular/cdk/layout';
import {
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatMenuModule,
  MatCardModule,
  MatGridListModule,
  MatInputModule,
  MatProgressBarModule,
  MatSnackBarModule,
  MatTableModule,
  MatBadgeModule,
  MatDialogModule,
  MatTooltipModule,
  MatSlideToggleModule,
  MatSliderModule,
  MatSelectModule,
  MatChipsModule,
} from '@angular/material';

import { ToolbarComponent } from '@shared/components/toolbar/toolbar.component';
import { NotifierComponent } from './components/notifier/notifier.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { ConfirmComponent } from './components/confirm/confirm.component';

@NgModule({
  declarations: [
    ToolbarComponent,
    NotifierComponent,
    PaginatorComponent,
    ConfirmComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    LayoutModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatCardModule,
    MatGridListModule,
    MatInputModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatTableModule,
    MatBadgeModule,
    MatDialogModule,
    MatTooltipModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatSelectModule,
    MatChipsModule,
  ],
  exports: [
    CommonModule,
    ToolbarComponent,
    PaginatorComponent,
    RouterModule,
    LayoutModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatCardModule,
    MatGridListModule,
    MatInputModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatTableModule,
    MatBadgeModule,
    MatDialogModule,
    MatTooltipModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatSelectModule,
    MatChipsModule,
  ],
  entryComponents: [NotifierComponent, ConfirmComponent],
})
export class SharedModule {}
