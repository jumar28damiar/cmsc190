import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleTextComponent } from './single-text.component';

describe('SingleTextComponent', () => {
  let component: SingleTextComponent;
  let fixture: ComponentFixture<SingleTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
