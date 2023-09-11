import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFormWrapperComponent } from './dynamic-form-wrapper.component';

describe('DynamicFormWrapperComponent', () => {
  let component: DynamicFormWrapperComponent;
  let fixture: ComponentFixture<DynamicFormWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicFormWrapperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicFormWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
