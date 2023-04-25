import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentRoomComponent } from './comment-room.component';

describe('CommentRoomComponent', () => {
  let component: CommentRoomComponent;
  let fixture: ComponentFixture<CommentRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommentRoomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
