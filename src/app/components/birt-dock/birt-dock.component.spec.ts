import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BirtDockComponent } from './birt-dock.component';

describe('BirtDockComponent', () => {
  let component: BirtDockComponent;
  let fixture: ComponentFixture<BirtDockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BirtDockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BirtDockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
