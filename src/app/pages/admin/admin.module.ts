import { NgModule } from "@angular/core";
import { AdminComponent } from "./admin.component";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { AdminRoutingModule } from "./admin-routing.module";
import { NavComponent } from './nav/nav.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {ConfirmPopupModule} from 'primeng/confirmpopup';
import {ButtonModule} from 'primeng/button';
import {MessagesModule} from 'primeng/messages';
import {ToastModule} from 'primeng/toast';
import {DialogModule} from 'primeng/dialog';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { PasswordModule } from 'primeng/password';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { TableModule } from 'primeng/table';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {PaginatorModule} from 'primeng/paginator';
import { BrowserModule } from "@angular/platform-browser";
import { ConfirmationService, MessageService } from 'primeng/api';
import { ChartModule } from 'primeng/chart';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { TabViewModule } from 'primeng/tabview';
import { FileUploadModule } from 'primeng/fileupload';
import { NgApexchartsModule } from 'ng-apexcharts';
import * as CanvasJSAngularChart from '../../../assets/canvasjs.angular.component';
import { DataComponent } from './data/data.component';
import { ProfileComponent } from './profile/profile.component';
import { ChartBaseComponent } from './chart-base/chart-base.component';
import { BarChartComponent } from './chart/bar-chart/bar-chart.component';
import { CheckboxModule } from 'primeng/checkbox';
import { PieChartComponent } from './chart/pie-chart/pie-chart.component';
import { LineChartComponent } from './chart/line-chart/line-chart.component';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { TagModule } from 'primeng/tag';
import { PatientComponent } from './patient/patient.component';
import { ComposantModule } from "../../composant/composant.module";
import { EtablissementComponent } from './etablissement/etablissement.component';
import { ConsultationComponent } from "./consultation/consultation.component";
import { PdfViewerModule } from "ng2-pdf-viewer";
import { UtilisateurComponent } from './utilisateur/utilisateur.component';
import { PreinscriptionComponent } from './preinscription/preinscription.component';
import { CaisseComponent } from './caisse/caisse.component';
import { MessagingComponent } from './messaging/messaging.component';
import { ReglageComponent } from './reglage/reglage.component';
import { ProgressBarModule } from 'primeng/progressbar';
import { FullCalendarModule } from '@fullcalendar/angular';
import { RendezvousComponent } from './rendezvous/rendezvous.component';
import { ReportComponent } from './report/report.component';
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { EtablissementsComponent } from './etablissements/etablissements.component';
var CanvasJSChart = CanvasJSAngularChart.CanvasJSChart;

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
  }
@NgModule({
    declarations: [
        AdminComponent,
        NavComponent,
        DashboardComponent,
        DataComponent,
        ProfileComponent,
        ChartBaseComponent,
        BarChartComponent,
        PieChartComponent,
        LineChartComponent,
        ConsultationComponent,
        PatientComponent,
        EtablissementComponent,
        UtilisateurComponent,
        PreinscriptionComponent,
        CaisseComponent,
        MessagingComponent,
        ReglageComponent,
        RendezvousComponent,
        ReportComponent,
        EtablissementsComponent
    ],
    providers: [MessageService, ConfirmationService],
    bootstrap: [AdminComponent],
    imports: [
        CommonModule,
        RouterModule,
        FullCalendarModule,
        AdminRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        ConfirmPopupModule,
        TableModule,
        TagModule,
        BreadcrumbModule,
        ButtonModule,
        AutoCompleteModule,
        CheckboxModule,
        MessagesModule,
        ToastModule,
        DialogModule,
        ChartModule,
        PasswordModule,
        TableModule,
        ProgressBarModule,
        FileUploadModule,
        ChartModule,
        ConfirmDialogModule,
        BrowserModule,
        BrowserAnimationsModule,
        PaginatorModule,
        CanvasJSAngularChartsModule,
        TabViewModule,
        NgApexchartsModule,
        ComposantModule,
        PdfViewerModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
    ]
})
export class AdminModule {}
