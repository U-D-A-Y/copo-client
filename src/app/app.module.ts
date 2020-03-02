import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FacultyComponent } from './faculty/faculty.component';
import { LeftBarComponent } from './left-bar/left-bar.component';
import { RootComponent } from './root/root.component';

@NgModule({
  declarations: [
    AppComponent,
    FacultyComponent,
    LeftBarComponent,
    RootComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
