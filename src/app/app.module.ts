import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { ListsComponent } from './components/lists/lists.component';
import { PopupComponent } from './components/popup/popup.component';


@NgModule({
  declarations: [
    AppComponent,
    ListsComponent,
    PopupComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
