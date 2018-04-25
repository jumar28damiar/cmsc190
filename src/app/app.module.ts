import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { NgModel } from '@angular/forms';
import { CarouselComponent } from './components/carousel/carousel.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { MultilinksComponent } from './components/multilinks/multilinks.component';
import { SidebarModule,SidebarContainer } from 'ng-sidebar';
import { ColorPickerModule } from 'angular4-color-picker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RouterModule, Routes } from '@angular/router';
import { WatershedComponent } from './components/watershed/watershed.component';
import { HomeComponent } from './components/home/home.component';
import { SingleTextComponent } from './components/single-text/single-text.component';
import { HttpModule } from '@angular/http';
import { HttpClientJsonpModule, HttpClientModule} from '@angular/common/http'
import { CookieService } from 'ngx-cookie-service';
import { WatersheddockComponent } from './components/watersheddock/watersheddock.component';
import { BirtDockComponent } from './components/birt-dock/birt-dock.component';
import { ProxyComponent } from './components/proxy/proxy.component';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { HighchartsComponent } from './components/highcharts/highcharts.component';
import { ChatService } from './services/chat.service'
import { refreshService } from './services/refresh.service'
import { WebsocketService } from './services/websocket.service'


import * as highcharts from 'highcharts';
import * as highchartsHeatmap from 'highcharts/modules/heatmap';
highchartsHeatmap(highcharts)
 

@NgModule({
  declarations: [
    AppComponent,
    CarouselComponent,
    NavbarComponent,
    MultilinksComponent,
    WatershedComponent,
    HomeComponent,
    SingleTextComponent,
    WatersheddockComponent,
    BirtDockComponent,
    ProxyComponent,
    AdminPageComponent,
    HighchartsComponent

  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SidebarModule.forRoot(),
    ColorPickerModule,
    BrowserAnimationsModule,
    HttpModule,
    HttpClientJsonpModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path:'', component:HomeComponent},
      { path:'viewCard/:id', component:WatershedComponent},
      { path:'regionData/:id', component: BirtDockComponent},
      { path:'proxy/:id',component: ProxyComponent},
      { path:'adminPage',component:AdminPageComponent},
      { path:'highchartsample', component: HighchartsComponent }
    ])
  ],
  providers: [ CookieService, refreshService, ChatService, WebsocketService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
