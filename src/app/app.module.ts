import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {WiloModule, AuthService, wiloReducers} from '4sure-wilo';
import {WorkflowLayoutModule, WorkflowLayoutComponent} from '4sure-default-layout';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { RouterModule } from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {clientConfig} from './config';
import { AppService } from './app.service';
import { environment } from '../environments/environment';
// import { requestOptionsProvider, Interceptor } from './interceptor';
import {TemplatesModule} from '4sure-templates';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {DynamicFormsModule} from '4sure-dynamic-forms'
// import {DynFormModule} from 'src/app/dyn-form/dyn-form.module';
import {SilComponentsModule} from './components/sil-components.module';
import {AuthImplService, IdentityModule, NoAuthGuard} from '4sure-identity';
import { EffectsModule } from '@ngrx/effects';
import { ThemeModule, blackoutTheme, middayTheme, midnightTheme } from '4sure-default-layout';
import { AzureCallbackComponent, LoginComponent, FLXAuthShellComponent, identityReducer, IdentityEffects } from '4sure-identity';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      {
        path: 'azure',
        children: [
          {
            path: 'callback',
            component: AzureCallbackComponent,
            canActivate: [NoAuthGuard]
          }
        ]
      },
      {
        path: 'auth',
        component: FLXAuthShellComponent,
        children: [
          {
            path: 'login',
            component: LoginComponent,
            canActivate: [NoAuthGuard]
          }
        ]
      }
  ]),
    WorkflowLayoutModule,
    DynamicFormsModule,
    StoreModule.forRoot({...wiloReducers, ...identityReducer}),
    EffectsModule.forRoot([IdentityEffects]),
    WiloModule.forRoot({
      clientConfig: clientConfig, 
      clientService: AppService,
      indexedDbName: 'dynDB',
      base_url: environment.api_url
    }),
    IdentityModule.forRoot({
      after_login_url: '/testApp/workflow/list',
      after_logout_url: '/auth/login',
      send_reset_link_endpoint: `${environment.api_url}v1/forgot_password/check-email`,
      login_endpoint: `${environment.api_url}v2/auth/login/`,
      no_auth_urls: ['/cons'],
      jwt_token: localStorage.getItem('flexus.web.token') ?? ''
    }, environment),
    SilComponentsModule,
    TemplatesModule,
      ThemeModule.forRoot({
    themes: [blackoutTheme, middayTheme, midnightTheme],
    active: 'blackout'
  }),

    StoreDevtoolsModule.instrument()
  ],
  providers: [
    {provide: AuthService, useExisting: AuthImplService},
    {provide: 'BACKEND_API_URL', useValue: environment.api_url},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
