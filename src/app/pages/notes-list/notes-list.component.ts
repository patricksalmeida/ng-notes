import { Component, OnInit } from '@angular/core';
import { NotesService } from 'src/app/core/services/notes.service';
import { Note } from 'src/app/models/note.model';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss']
})
export class NotesListComponent implements OnInit {

  notes: Note[] = new Array<Note>();

  constructor(private notesService: NotesService) { }

  ngOnInit(): void {
    this.notes = this.notesService.getAll();
  }

  deleteNote(id: number) {
    this.notesService.delete(id);
  }
}
