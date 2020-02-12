import { Component, OnInit, EventEmitter,Input,Output } from '@angular/core';

@Component({
  selector: 'app-more-button',
  templateUrl: './more-button.component.html',
  styleUrls: ['./more-button.component.scss']
})
export class MoreButtonComponent implements OnInit {
  @Input() loading:boolean;
  @Output() onPress=new EventEmitter();
  
    constructor() { }
  
    ngOnInit() {
    }
  
    fetchMore(){
      this.onPress.emit()
    }
  
  }
  