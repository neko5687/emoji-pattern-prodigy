import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatricesComponent } from './matrices/matrices.component';
import {HttpClientModule} from "@angular/common/http";
import { MatrixComponent } from './matrix/matrix.component';
import { AlgorithmicThinkingComponent } from './algorithmic-thinking/algorithmic-thinking.component';
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component';
import { ErrorComponent } from './error/error.component';

@NgModule({
  declarations: [
    AppComponent,
    MatricesComponent,
    MatrixComponent,
    AlgorithmicThinkingComponent,
    LoginComponent,
    AboutComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
