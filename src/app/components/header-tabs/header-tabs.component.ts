import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header-tabs',
  templateUrl: './header-tabs.component.html',
  styleUrls: ['./header-tabs.component.scss']
})
export class HeaderTabsComponent implements OnInit {
@Input() name:string;
@Input() buttonText:string;
@Input() tabs:Array<any>;
@Output() onPress=new EventEmitter();
@Input() isMenu:boolean;
  constructor() { }

  ngOnInit() {
  }
  create(event){
    this.onPress.emit(event);
  }

}
