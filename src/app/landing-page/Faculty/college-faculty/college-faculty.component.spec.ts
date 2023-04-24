import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollegeFacultyComponent } from './college-faculty.component';

describe('CollegeFacultyComponent', () => {
  let component: CollegeFacultyComponent;
  let fixture: ComponentFixture<CollegeFacultyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollegeFacultyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollegeFacultyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
