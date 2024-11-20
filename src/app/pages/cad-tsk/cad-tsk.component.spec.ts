import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadTskComponent } from './cad-tsk.component';

describe('CadTskComponent', () => {
  let component: CadTskComponent;
  let fixture: ComponentFixture<CadTskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadTskComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadTskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
