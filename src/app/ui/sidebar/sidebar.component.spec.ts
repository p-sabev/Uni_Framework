import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { NewsService } from 'src/app/_services/news.service';
import { SidebarComponent } from './sidebar.component';
import { HandleErrorsService } from 'src/app/_services/handle-errors.service';
import { Store } from '@ngrx/store';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  beforeEach(() => {
    const routerStub = () => ({ navigate: array => ({}) });
    const newsServiceStub = () => ({
      getSources: (language, country) => ({ subscribe: f => f({}) })
    });
    const handleErrorsServiceStub = () => ({ handleNewsError: error => ({}) });
    const storeStub = () => ({
      select: function0 => ({}),
      dispatch: object => ({})
    });

    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [SidebarComponent],
      providers: [
        { provide: Router, useFactory: routerStub },
        { provide: NewsService, useFactory: newsServiceStub },
        { provide: HandleErrorsService, useFactory: handleErrorsServiceStub },
        { provide: Store, useFactory: storeStub }
      ]
    });
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`language has default value`, () => {
    expect(component.language).toEqual(`en`);
  });

  it(`country has default value`, () => {
    expect(component.country).toEqual(`us`);
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      spyOn(component, 'getAllSources').and.callThrough();
      component.ngOnInit();
      expect(component.getAllSources).toHaveBeenCalled();
    });
  });

  describe('getAllSources', () => {
    it('makes expected calls', () => {
      const newsServiceStub: NewsService = fixture.debugElement.injector.get(
        NewsService
      );
      spyOn(newsServiceStub, 'getSources').and.callThrough();
      component.getAllSources();
      expect(newsServiceStub.getSources).toHaveBeenCalled();
    });
  });
});
