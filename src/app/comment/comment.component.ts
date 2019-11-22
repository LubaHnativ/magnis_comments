/*eslint-disable*/

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as uuid from 'uuid';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @Input() comment;
  @Output() public updateComments = new EventEmitter();
  new_comment = ' ';

  constructor() {

  }

  updateCommentListener(event) {
    console.log(event);

    let sender:any = this.comment.responses.filter(comment => {
      return comment.id === event.id;
    });

    sender = event;

    this.updateComments.emit(this.comment.responses); 
  }

  updateCommentEmitter() {
    if (!this.new_comment) {
      alert('Please, don\'t leave it blank');
      return;
    }
    
    let new_comment = {
      id: uuid.v4(),
      text: this.new_comment,
      responses: []
    };

    this.comment.responses.push(new_comment);
    this.updateComments.emit(this.comment)
    this.new_comment = '';
  }

  ngOnInit() {

  }

}
