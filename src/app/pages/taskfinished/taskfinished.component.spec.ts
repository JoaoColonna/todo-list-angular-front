import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskfinishedComponent } from './taskfinished.component';

describe('TaskfinishedComponent', () => {
  let component: TaskfinishedComponent;
  let fixture: ComponentFixture<TaskfinishedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskfinishedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskfinishedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
