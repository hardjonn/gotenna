import { Component, OnInit, Input } from '@angular/core';

import { PaginatorModel } from '@core/models/paginator.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent implements OnInit {
  @Input()
  paginator: PaginatorModel;

  @Input()
  baseUrl = '/';

  @Input()
  pageSuffix = 'page';

  constructor(private router: Router, private route: ActivatedRoute) {}

  linkToPage(page: number): string {
    const params = {
      ...this.route.snapshot.params,
      ...{ [this.pageSuffix]: page },
    };

    const segments = [this.baseUrl];

    for (const param in params) {
      if (params.hasOwnProperty(param)) {
        const value = params[param];

        if (!(param === this.pageSuffix && value === 1)) {
          segments.push(param);
          segments.push(value);
        }
      }
    }

    return this.router.createUrlTree(segments, {}).toString();
  }

  ngOnInit() {}
}
