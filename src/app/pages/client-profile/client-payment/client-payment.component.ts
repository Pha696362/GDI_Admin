import { MappingService } from 'src/app/services/mapping.service';
import { Pages } from 'src/app/dummy/pages';
import { DataService } from 'src/app/services/data.service';
import { MatSnackBar } from '@angular/material';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs';
import { FormGroup, AbstractControl, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ConvertService } from 'src/app/services/convert.service';
import { Environment } from 'src/app/stores/environment.store';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscriber } from 'src/app/stores/subscriber.store';

@Component({
  selector: 'app-client-payment',
  templateUrl: './client-payment.component.html',
  styleUrls: ['./client-payment.component.scss']
})
export class ClientPaymentComponent implements OnInit {
  
  constructor(
    private route: ActivatedRoute,
    public env: Environment,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    public store: Subscriber
  ) { }

  ngOnInit() {
    this.store.subscriberKey = null;
    this.route.parent.params.forEach(params => {
      this.store.subscriberKey = params['id'];
      this.store.fetchSubscriberDoc(this.store.subscriberKey);
      this.store.fetchSubscriberReceipts(this.store.subscriberKey);
    })
  }

}

