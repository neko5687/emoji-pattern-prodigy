import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MatrixComponent} from "./matrix/matrix.component";
import {MatricesComponent} from "./matrices/matrices.component";
import {LoginComponent} from "./login/login.component";
import {AlgorithmicThinkingComponent} from "./algorithmic-thinking/algorithmic-thinking.component";
import {AboutComponent} from "./about/about.component";
import {ErrorComponent} from "./error/error.component";
import {AuthenticationGuard} from "./authentication.guard";
import {SignupComponent} from "./signup/signup.component";

const routes: Routes = [
  {path:"", pathMatch:"full", redirectTo:"matrices"},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'matrices', component: MatricesComponent},
  {path: 'about', component: AboutComponent},
  {path: 'matrices/:id', component: MatrixComponent, canActivate: [AuthenticationGuard]},
  {path: 'algorithmic', component: AlgorithmicThinkingComponent},
  {path: "**", component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
