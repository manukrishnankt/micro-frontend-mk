import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PrettyEditorComponent } from './pretty-editor.component';

describe('PrettyEditorComponent', () => {
  let component: PrettyEditorComponent;
  let fixture: ComponentFixture<PrettyEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PrettyEditorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PrettyEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
