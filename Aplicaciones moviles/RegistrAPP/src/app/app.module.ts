import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './auth.service';
import { CanActivateGuard } from './canactivate.guard';
import { CanDeactivateGuard } from './candeactivate.guard';
import { CanMatchGuard } from './canmatch.guard';
import { StorageService } from './services/storage.service';
import { ApiService } from './services/api.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    IonicStorageModule.forRoot(),
    HttpClientModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AuthService,
    CanActivateGuard,
    CanDeactivateGuard,
    CanMatchGuard,
    StorageService,
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { } // Asegúrate de que esta línea esté presente
