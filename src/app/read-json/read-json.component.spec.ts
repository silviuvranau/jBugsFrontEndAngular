import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadJsonComponent } from './read-json.component';

describe('ReadJsonComponent', () => {
  let component: ReadJsonComponent;
  let fixture: ComponentFixture<ReadJsonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadJsonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadJsonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
