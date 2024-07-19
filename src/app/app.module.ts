import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ConfirmPopupModule} from 'primeng/confirmpopup';
import {ButtonModule} from 'primeng/button';
import {MessagesModule} from 'primeng/messages';
import {ToastModule} from 'primeng/toast';
import {DialogModule} from 'primeng/dialog';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { PasswordModule } from 'primeng/password';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import {PaginatorModule} from 'primeng/paginator';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AdminModule } from './pages/admin/admin.module';
import { authInterceptorProviders } from './services/interceptor.service';
import { ComposantModule } from "./composant/composant.module";
import { PublicComponent } from './pages/public/public.component';
import { PublicModule } from './pages/public/public.module';
import { RouterModule } from '@angular/router';


export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
  }
  
@NgModule({
    declarations: [
        AppComponent,
        PublicComponent
    ],
    providers: [authInterceptorProviders],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        AdminModule,
        HttpClientModule,
        PublicModule,
        FormsModule,
        RouterModule,
        ReactiveFormsModule,
        ConfirmPopupModule,
        ButtonModule,
        MessagesModule,
        ToastModule,
        DialogModule,
        PasswordModule,
        ConfirmDialogModule,
        BrowserAnimationsModule,
        PaginatorModule,
        ComposantModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
    ]
})
export class AppModule { }
