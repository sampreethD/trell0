import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})
export class ListsComponent implements OnInit {

  @Input() lists: any;
  createTask = {
    show: false,
    index: 0
  };
  listAcc = new BehaviorSubject<Array<[]>>([])
  listContainer = this.listAcc.asObservable();
  listIndexToRem = 0;
  cardIndexToRem = 0;
  constructor() { }

  ngOnInit(): void {
    this.listContainer.subscribe((res:any)=>{
      localStorage.setItem('lists',JSON.stringify(res));
    })
  }

  deleteList(index: any) {
    this.lists.splice(index, 1);
  }

  addTask(i: any) {
    this.createTask = {
      index: i,
      show: true
    }
  }

  createNewTask(event: any, i: any) {
    this.lists[i]['cards'].forEach((ele: any) => {
      if (ele.title === event.title) {
        event = null;
      }
    })
    if (event) {
      this.lists[i]['cards'].unshift(event);
      this.createTask.show = false;
      this.listAcc.next(this.lists);
    }
  }

  deleteTask(i: any, cardIndex: any) {
    this.lists[i]['cards'].splice(cardIndex, 1);
    this.listAcc.next(this.lists);
  }

  filterCards() {
    this.lists.map((ele: any) => {
      ele.cards.sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    })
  }

  drop(ev: any) {
    ev.preventDefault();
    this.lists[ev.target.id.split('-')[1]]['cards'].push(this.lists[this.listIndexToRem]['cards'][this.cardIndexToRem]);
    this.deleteTask(this.listIndexToRem, this.cardIndexToRem);
    this.listAcc.next(this.lists);
    this.filterCards()
  }

  allowDrop(ev: any) {
    ev.preventDefault();
  }

  drag(ev: any, index: any, cardIndex: any) {
    this.cardIndexToRem = cardIndex;
    this.listIndexToRem = ev.target.id
    ev.dataTransfer.setData("text", ev.target.id);
  }
}
