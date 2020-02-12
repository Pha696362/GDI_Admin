import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-primary-button',
  templateUrl: './primary-button.component.html',
  styleUrls: ['./primary-button.component.scss']
})
export class PrimaryButtonComponent implements OnInit {
  @Input() class:any;
  @Input() process:boolean;
  @Input() label:string;
  @Output() onPress=new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  _onPress(){
    this.onPress.emit();
  }

}
