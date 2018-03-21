import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultilinksComponent } from './multilinks.component';

describe('MultilinksComponent', () => {
  let component: MultilinksComponent;
  let fixture: ComponentFixture<MultilinksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultilinksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultilinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
