import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { UiFilterDimModel } from '@app/core/models';

@Component({
  selector: 'app-filter-dims',
  templateUrl: './filter-dims.component.html',
  styleUrls: ['./filter-dims.component.scss'],
})
export class FilterDimsComponent implements OnInit {
  @Input()
  dims: UiFilterDimModel[];

  @Input()
  baseUrl = '/';

  constructor(private router: Router, private route: ActivatedRoute) {}

  linkToPage(dim: UiFilterDimModel): string {
    const segments = [this.baseUrl];
    const dimensions = [];

    this.dims.forEach(item => {
      const active = item.key === dim.key ? dim.active : !item.active;

      if (!active) {
        dimensions.push(item.key);
      }
    });

    if (dimensions.length) {
      segments.push(dimensions.join(','));
    }

    return this.router.createUrlTree(segments, {}).toString();
  }

  ngOnInit() {}
}
