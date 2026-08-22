import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection
} from '@angular/core';

import {
  provideRouter
} from '@angular/router';

import { routes } from './app.routes';

import {
  provideClientHydration,
  withEventReplay,
  withNoIncrementalHydration
} from '@angular/platform-browser';

import {
  HttpClient,
  provideHttpClient,
  withFetch,
  withInterceptors
} from '@angular/common/http';

import { provideAnimations } from '@angular/platform-browser/animations';

import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {
  TranslateLoader,
  TranslateModule
} from '@ngx-translate/core';

import { hraderInterceptor } from './core/interceptors/header/hrader.interceptor';
import { loaderInterceptor } from './core/interceptors/loading/loader.interceptor';
import { handelErrorInterceptor } from './core/interceptors/error/handel-error.interceptor';

import { NgxSpinnerModule } from 'ngx-spinner';


function httpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(
    http,
    './../assets/i18n/',
    '.json'
  );
}


export const appConfig: ApplicationConfig = {

  providers: [

    provideZoneChangeDetection({
      eventCoalescing: true
    }),

    provideRouter(routes),

    provideClientHydration(
      withEventReplay(),
      withNoIncrementalHydration()
    ),

    provideHttpClient(
      withFetch(),
      withInterceptors([
        hraderInterceptor,
        loaderInterceptor,
        handelErrorInterceptor
      ])
    ),

    provideAnimations(),

    importProvidersFrom(

      NgxSpinnerModule,

      TranslateModule.forRoot({
        defaultLanguage: 'en',

        loader: {
          provide: TranslateLoader,
          useFactory: httpLoaderFactory,
          deps: [HttpClient]
        }
      })

    )

  ]

};