import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { noticiasComponent } from './noticias.component';

describe('NoticiasComponent', () => {
  let component: noticiasComponent;
  let fixture: ComponentFixture<noticiasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [noticiasComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(noticiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
