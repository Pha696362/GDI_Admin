import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-empty',
  templateUrl: './empty.component.html',
  styleUrls: ['./empty.component.scss']
})
export class EmptyComponent implements OnInit {
  @Input() image:any;
  @Input() name:any;
  @Input() subtitle:any;
  @Input() buttonText:any;
  @Input() disabled:boolean;

  @Output() onPress = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }
  
  create(){
    this.onPress.emit()
  }


}
