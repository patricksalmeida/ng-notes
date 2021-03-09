import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { NotesService } from 'src/app/core/services/notes.service';
import { Note } from 'src/app/models/note.model';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss'],
  animations: [
    trigger('itemAnim', [
      transition('void => *', [
        style({
          height: 0,
          opacity: 0,
          transform: 'scale(0.05)',
          'margin-bottom': 0,
          paddingTop: 0,
          paddingBottom: 0,
          paddingRight: 0,
          paddingLeft: 0,
        }),
        animate('50ms', style({
          height: '*',
          'margin-bottom': '*',
          paddingTop: '*',
          paddingBottom: '*',
          paddingRight: '*',
          paddingLeft: '*',
        })),
        animate(68)
      ]),
      transition('* => void', [
        animate(50, style({
          transform: 'scale(1.05)',
        })),
        animate(50, style({
          transform: 'scale(1)',
          opacity: 0.75
        })),
        animate('120ms ease-out', style({
          transform: 'scale(0.68)',
          opacity: 0
        })),
        animate('150ms ease-out', style({
          height: 0,
          paddingTop: 0,
          paddingBottom: 0,
          paddingRight: 0,
          paddingLeft: 0,
          'margin-bottom': 0,
        }))
      ])
    ]),

    trigger('listAnim', [
      transition('* => *', [
        query(':enter', [
          style({
            opacity: 0,
            height: 0
          }),
          stagger(100, [
            animate('0.2s ease')
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class NotesListComponent implements OnInit {

  notes: Note[] = new Array<Note>();
  filteredNotes: Note[] = new Array<Note>();

  constructor(private notesService: NotesService) { }

  ngOnInit(): void {
    this.notes = this.notesService.getAll();
    this.filteredNotes = this.notes;
  }

  deleteNote(id: number) {
    this.notesService.delete(id);
  }

  filter(query: string) {
    query = query.toLowerCase().trim();

    let allResults: Note[] = new Array<Note>();

    let terms: string[] = query.split(' ');
    terms = this.removeDuplicates(terms);

    terms.forEach(term => {
      let results = this.relevantNotes(term)
      allResults = [...allResults, ...results]
    });

    let uniqueResults = this.removeDuplicates(allResults);
    
    this.filteredNotes = uniqueResults;
  }

  removeDuplicates(arr: Array<any>): Array<any> {
    let uniqueResults: Set<any> = new Set<any>();

    arr.forEach(e => uniqueResults.add(e))

    return Array.from(uniqueResults)
  }

  relevantNotes(query: string): Array<Note> {
    query = query.toLowerCase().trim();

    return this.notes.filter(note => note.title && note.title.toLowerCase().includes(query))
  }
}
