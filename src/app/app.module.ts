import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LeftBarComponent } from './left-bar/left-bar.component';

import { AppRoutingModule } from './app-routing.module';
import { AdminModule } from './admin/admin.module';
@NgModule({
    declarations: [
        AppComponent,
        LeftBarComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        AdminModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
