import { Component, OnInit, ViewChild } from '@angular/core';
import {ListsComponent} from './components/lists/lists.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @ViewChild(ListsComponent,{static:false})listComp:any;
    title = 'trello';
  showAddList = false;
  listTitle = '';
  listsArr:any = [];

  constructor(){    
  }

  ngOnInit(){
    this.listsArr = JSON.parse(localStorage.getItem('lists')|| '[]')
    if(!localStorage.getItem('lists')){
      window.localStorage.setItem('lists', JSON.stringify(this.listsArr));
  }
  }
  addListTitle() {
    this.showAddList = true;
  }

  addList(event: { preventDefault: () => void; }) {
    event.preventDefault()
    let list = {
      name:this.listTitle,
      cards:[]
    }
    this.listsArr.push(list);
    this.listTitle = '';
    this.listComp.listAcc.next(this.listsArr);
  }
}
