import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatSlideToggleChange, MatSliderChange } from '@angular/material';

import { ImageModel } from '@core/models';

@Component({
  selector: 'app-image-cards',
  templateUrl: './image-cards.component.html',
  styleUrls: ['./image-cards.component.scss'],
})
export class ImageCardsComponent implements OnInit {
  @Input()
  imageList: ImageModel[];

  @Input()
  loading: boolean;

  @Output()
  filterApplyEvent = new EventEmitter<ImageModel>();

  constructor() {}

  ngOnInit() {}

  onGrayScaleChange(event: MatSlideToggleChange, image: ImageModel) {
    const filteredImage = { ...image, filterGrayScale: event.checked };
    this.filterApplyEvent.emit(filteredImage);
  }

  onBlurChange(event: MatSliderChange, image: ImageModel) {
    const filteredImage = { ...image, filterBlur: event.value };
    this.filterApplyEvent.emit(filteredImage);
  }
}
