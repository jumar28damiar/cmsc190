import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WatershedComponent } from './watershed.component';

describe('WatershedComponent', () => {
  let component: WatershedComponent;
  let fixture: ComponentFixture<WatershedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WatershedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WatershedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
