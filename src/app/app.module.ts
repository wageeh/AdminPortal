import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// for importing services
import { CoreService } from '../providers/core/core.service';
import { FleetService } from '../providers/fleet/fleet.service';
import { VehiclestatusService } from '../providers/vehiclestatus/vehiclestatus.service';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    CoreService,
    FleetService, 
    VehiclestatusService
  ],
  bootstrap: [AppComponent],
  entryComponents: [DashboardComponent]
})
export class AppModule { }
