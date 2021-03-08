import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotesListComponent } from './pages/notes-list/notes-list.component';
import { MainComponent } from './pages/main/main.component';
import { NoteCardComponent } from './shared/components/note-card/note-card.component';
import { NoteDetailsComponent } from './pages/note-details/note-details.component';

@NgModule({
  declarations: [
    AppComponent,
    NotesListComponent,
    MainComponent,
    NoteCardComponent,
    NoteDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
