import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './auth.service';
import { CanActivateGuard } from './canactivate.guard';
import { CanDeactivateGuard } from './candeactivate.guard';
import { CanMatchGuard } from './canmatch.guard';
import { StorageService } from './services/storage.service'; // Importamos StorageService

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    IonicStorageModule.forRoot()
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AuthService,
    CanActivateGuard,
    CanDeactivateGuard,
    CanMatchGuard,
    StorageService // Añadimos StorageService a los providers
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
