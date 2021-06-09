import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {

  @Output() newTask = new EventEmitter<Object>();
  @Output() closePop = new EventEmitter();

  constructor() { }

  title = '';
  desc = '';

  ngOnInit(): void {
  }

  hidePopup() {
    this.closePop.emit(true);
  }

  createTask(event: { preventDefault: () => void; }) {
    event.preventDefault()
    let task = {
      title: this.title,
      description: this.desc,
      created_at: new Date()
    }
    this.newTask.emit(task);
    this.title = '';
    this.desc = '';

  }

}
