import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiAndDsComponent } from './ai-and-ds.component';

describe('AiAndDsComponent', () => {
  let component: AiAndDsComponent;
  let fixture: ComponentFixture<AiAndDsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AiAndDsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AiAndDsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
