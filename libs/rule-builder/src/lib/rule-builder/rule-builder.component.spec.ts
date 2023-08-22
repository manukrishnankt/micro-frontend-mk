import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RuleBuilderComponent } from './rule-builder.component';

describe('RuleBuilderComponent', () => {
  let component: RuleBuilderComponent;
  let fixture: ComponentFixture<RuleBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RuleBuilderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RuleBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
