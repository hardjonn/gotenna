import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState } from '@core/store/reducers';
import { UploadModel } from '@core/models';
import * as fromUpload from '@core/store/selectors/upload.selectors';
import { Upload } from '@core/store/actions';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
})
export class AdminPageComponent implements OnInit {
  error$: Observable<null | any>;
  uploading$: Observable<boolean>;

  fileToUpload: UploadModel = null;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.error$ = this.store.pipe(select(fromUpload.getUploadError));
    this.uploading$ = this.store.pipe(select(fromUpload.getUploadUploading));
  }

  onFileChange(files: FileList) {
    this.fileToUpload = { file: files.item(0) };
  }

  onUpload() {
    this.store.dispatch(new Upload(this.fileToUpload));
  }
}
