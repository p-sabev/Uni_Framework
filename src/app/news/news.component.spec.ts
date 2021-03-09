import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NewsService } from '../_services/news.service';
import { NewsComponent } from './news.component';
import { HandleErrorsService } from '../_services/handle-errors.service';
import { Store } from '@ngrx/store';

describe('NewsComponent', () => {
  let component: NewsComponent;
  let fixture: ComponentFixture<NewsComponent>;

  beforeEach(() => {
    const newsServiceStub = () => ({
      getSources: (language, country) => ({ subscribe: f => f({}) }),
      getRandomTopNews: randomSources => ({ subscribe: f => f({}) })
    });
    const handleErrorsServiceStub = () => ({ handleNewsError: error => ({}) });
    const storeStub = () => ({
      select: function0 => ({}),
      dispatch: object => ({})
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [NewsComponent],
      providers: [
        { provide: NewsService, useFactory: newsServiceStub },
        { provide: HandleErrorsService, useFactory: handleErrorsServiceStub },
        { provide: Store, useFactory: storeStub }
      ]
    });
    fixture = TestBed.createComponent(NewsComponent);
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

  it(`loadingNews has default value`, () => {
    expect(component.loadingNews).toEqual(true);
  });
});
