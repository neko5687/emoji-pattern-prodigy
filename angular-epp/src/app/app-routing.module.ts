import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MatrixComponent} from "./matrix/matrix.component";
import {MatricesComponent} from "./matrices/matrices.component";
import {LoginComponent} from "./login/login.component";
import {AlgorithmicThinkingComponent} from "./algorithmic-thinking/algorithmic-thinking.component";
import {AboutComponent} from "./about/about.component";

const routes: Routes = [
  {path:"", pathMatch:"full", redirectTo:"matrices"},
  {path: 'matrix', component: MatrixComponent},
  {path: 'matrices', component: MatricesComponent},
  {path: 'login', component: LoginComponent},
  {path: 'algorithmic', component: AlgorithmicThinkingComponent},
  {path: 'about', component: AboutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
