import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgRedux } from 'ng2-redux';
import { IAppState } from './store';
import * as uuid from 'uuid';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  search_query = '';
  new_comment = '';
  search_results = [

  ];

  comments = [
    {
      id: uuid.v4(),
      text: 'Lorem I note release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
      responses: []
    }, 
    {
      id: uuid.v4(),
      text: 'Cool',
      responses: [
        {
          id: uuid.v4(),
          text: 'Hello',
          responses: [
            {
              id: uuid.v4(),
              text: 'Nice video',
              responses: []
            }
          ]
        }
      ]
    },
    {
      id: uuid.v4(),
      text: 'Bad content',
      responses: [
        {
          id: uuid.v4(),
          text: 'Sure',
          responses: []
        }
      ]
    },
    {
      id: uuid.v4(),
      text: 'Like',
      responses: []
    }
  ];

  constructor() {

  }

  addNew() {
    if (!this.new_comment.trim()) {
      alert('Enter something');
      return;
    }

    this.comments.unshift({
      id: uuid.v4(),
      text: this.new_comment,
      responses: []
    });

    this.new_comment = ' ';
    console.log(this.comments);
  }

  updateComments(event) {

    let sender:any = this.comments.filter(comment => {
      return comment.id === event.id;
    });

    sender.responses = event.responses;

  }


  search() {
    this.search_results = [];
    this.recursiveCommentsSearch();
  }

  recursiveCommentsSearch(objects = this.comments, query = this.search_query, search_results = this.search_results, context = this) {
    if (!query.trim()) {
      search_results = [];
    } 

    if (query.length < 3) {
      alert('3 chars minimum');
      return;
    }

    objects.forEach(function(obj) {
      if (obj.text.toLocaleLowerCase().includes(query.trim().toLowerCase())) {
        search_results.push(obj);
      }

      if (obj.responses.length) {
        context.recursiveCommentsSearch(obj.responses, query, search_results);
      }
    })
  }
}
