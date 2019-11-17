import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterDimsComponent } from './filter-dims.component';

describe('FilterDimsComponent', () => {
  let component: FilterDimsComponent;
  let fixture: ComponentFixture<FilterDimsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterDimsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterDimsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
