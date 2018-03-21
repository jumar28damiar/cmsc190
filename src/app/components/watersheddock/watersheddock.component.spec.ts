import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WatersheddockComponent } from './watersheddock.component';

describe('WatersheddockComponent', () => {
  let component: WatersheddockComponent;
  let fixture: ComponentFixture<WatersheddockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WatersheddockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WatersheddockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
