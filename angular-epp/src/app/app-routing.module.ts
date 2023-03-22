import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MatrixComponent} from "./matrix/matrix.component";
import {MatricesComponent} from "./matrices/matrices.component";
import {LoginComponent} from "./login/login.component";
import {AlgorithmicThinkingComponent} from "./algorithmic-thinking/algorithmic-thinking.component";
import {AboutComponent} from "./about/about.component";
import {ErrorComponent} from "./error/error.component";
import {AuthenticationGuard} from "./authentication.guard";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path:"", pathMatch:"full", canActivate:[AuthenticationGuard], children: [
  {path: 'matrices', component: MatricesComponent},
  {path: 'matrices/:id', component: MatrixComponent},
  {path: 'algorithmic', component: AlgorithmicThinkingComponent},
  {path: 'about', component: AboutComponent},
  {path:"**", component:ErrorComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
