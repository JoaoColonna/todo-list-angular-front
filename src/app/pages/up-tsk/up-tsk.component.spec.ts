import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpTskComponent } from './up-tsk.component';

describe('UpTskComponent', () => {
  let component: UpTskComponent;
  let fixture: ComponentFixture<UpTskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpTskComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpTskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
