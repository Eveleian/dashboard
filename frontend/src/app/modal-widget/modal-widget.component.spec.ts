import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalWidgetComponent } from './modal-widget.component';

describe('ModalWidgetComponent', () => {
  let component: ModalWidgetComponent;
  let fixture: ComponentFixture<ModalWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalWidgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
