import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  @Input() icon:any;
  @Input() message:any;
  @Input() css:any;

  messages:any;
  constructor() { }

  ngOnInit() {
    this.messages={
      icon:this.icon,
      message:this.message,
      css:this.css
    }
  }

}
