import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatricesComponent } from './matrices/matrices.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { MatrixComponent } from './matrix/matrix.component';
import { AlgorithmicThinkingComponent } from './algorithmic-thinking/algorithmic-thinking.component';
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component';
import { ErrorComponent } from './error/error.component';
import {FormsModule} from "@angular/forms";
import { RequestInterceptor } from './request.interceptor';
import { MatrixcreationComponent } from './matrixcreation/matrixcreation.component';
import { SignupComponent } from './signup/signup.component';
import { HighscoreComponent } from './highscore/highscore.component';

@NgModule({
  declarations: [
    AppComponent,
    MatricesComponent,
    MatrixComponent,
    AlgorithmicThinkingComponent,
    LoginComponent,
    AboutComponent,
    ErrorComponent,
    MatrixcreationComponent,
    ErrorComponent,
    SignupComponent,
    HighscoreComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
