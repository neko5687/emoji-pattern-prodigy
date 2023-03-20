import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatricesComponent } from './matrices/matrices.component';
import { MatrixComponent } from './matrix/matrix.component';
import { AlgorithmicThinkingComponent } from './algorithmic-thinking/algorithmic-thinking.component';
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    MatricesComponent,
    MatrixComponent,
    AlgorithmicThinkingComponent,
    LoginComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
