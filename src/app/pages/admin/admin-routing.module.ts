import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminComponent } from "./admin.component";
import { UsersComponent } from "./users/users.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { DataComponent } from "./data/data.component";
import { EquipeComponent } from "./equipe/equipe.component";
import { AuthGuard } from "src/app/services/guard/auth.guard";
import { RoleGuard } from "src/app/services/guard/role.guard";
import { ProfileComponent } from "./profile/profile.component";
import { BarChartComponent } from "./chart/bar-chart/bar-chart.component";
import { PieChartComponent } from "./chart/pie-chart/pie-chart.component";
import { LineChartComponent } from "./chart/line-chart/line-chart.component";
import { GestionequipeComponent } from "./gestionequipe/gestionequipe.component";
import { AgentComponent } from "./agent/agent.component";
import { DonneeagentComponent } from "./donneeagent/donneeagent.component";
import { ChefequipeComponent } from "./chefequipe/chefequipe.component";
import { PatientComponent } from "./patient/patient.component";
import { EtablissementComponent } from "./etablissement/etablissement.component";
import { ConsultationComponent } from "src/app/pages/admin/consultation/consultation.component";
import { DetailsComponent } from "./details/details.component";
import { UtilisateurComponent } from "./utilisateur/utilisateur.component";
import { MessagingComponent } from "./messaging/messaging.component";
import { PreinscriptionComponent } from "./preinscription/preinscription.component";
import { CaisseComponent } from "./caisse/caisse.component";
import { ReglageComponent } from "./reglage/reglage.component";
import { RendezvousComponent } from "./rendezvous/rendezvous.component";


const routes: Routes = [
  {
    path: 'gestion', canActivate:[AuthGuard],
    component: AdminComponent, children: [
      { path: 'users', component: UsersComponent,canActivate:[RoleGuard,AuthGuard]},
      { path: 'dashboard', component: DashboardComponent ,canActivate:[AuthGuard]},
      { path: 'patient', component: PatientComponent ,canActivate:[AuthGuard]},
      {path:'data',component: DataComponent,canActivate:[AuthGuard]},
      {path:'consultation',component: ConsultationComponent,canActivate:[AuthGuard]},
      {path:'etablissement',component: EtablissementComponent,canActivate:[AuthGuard]},
      {path: 'profile',component: ProfileComponent,canActivate:[AuthGuard]},
      {path: 'details',component: DetailsComponent,canActivate:[AuthGuard]},
      {path:'equipe',component: EquipeComponent,canActivate:[AuthGuard]},
      {path: 'gestion-equipe',component: GestionequipeComponent,canActivate:[AuthGuard]},
      {path: 'agent',component: AgentComponent,canActivate:[AuthGuard]},
      {path: 'utlisateur',component: UtilisateurComponent,canActivate:[AuthGuard]},
      {path: 'messenging',component: MessagingComponent,canActivate:[AuthGuard]},
      {path: 'prescription',component: PreinscriptionComponent,canActivate:[AuthGuard]},
      {path: 'caisse',component: CaisseComponent,canActivate:[AuthGuard]},
      {path: 'reglage',component: ReglageComponent,canActivate:[AuthGuard]},
      {path: 'rendez-vous',component: RendezvousComponent,canActivate:[AuthGuard]},
      {path: 'donnee-agent', component: DonneeagentComponent,canActivate:[AuthGuard]},
      {path: 'mon-equipe',component: ChefequipeComponent,canActivate: [AuthGuard]},
      {path: 'bar-chart',component: BarChartComponent},
      {path: 'pie-chart',component: PieChartComponent},
      {path: 'line-chart',component: LineChartComponent}

    ]
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports : [RouterModule]
})
export class AdminRoutingModule {}
