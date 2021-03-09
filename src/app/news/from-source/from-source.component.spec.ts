import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsService } from 'src/app/_services/news.service';
import { FromSourceComponent } from './from-source.component';
import { HandleErrorsService } from 'src/app/_services/handle-errors.service';
import { Store } from '@ngrx/store';

describe('FromSourceComponent', () => {
  let component: FromSourceComponent;
  let fixture: ComponentFixture<FromSourceComponent>;

  beforeEach(() => {
    const activatedRouteStub = () => ({ params: { subscribe: f => f({}) } });
    const newsServiceStub = () => ({
      getArticlesFromSource: sourceName => ({ subscribe: f => f({}) })
    });
    const handleErrorsServiceStub = () => ({ handleNewsError: error => ({}) });
    const storeStub = () => ({
      select: function0 => ({}),
      dispatch: object => ({})
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [FromSourceComponent],
      providers: [
        { provide: ActivatedRoute, useFactory: activatedRouteStub },
        { provide: NewsService, useFactory: newsServiceStub },
        { provide: HandleErrorsService, useFactory: handleErrorsServiceStub },
        { provide: Store, useFactory: storeStub }
      ]
    });
    fixture = TestBed.createComponent(FromSourceComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`loadingNews has default value`, () => {
    expect(component.loadingNews).toEqual(true);
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      spyOn(component, 'subscribeForRootParams').and.callThrough();
      component.ngOnInit();
      expect(component.subscribeForRootParams).toHaveBeenCalled();
    });
  });

});
