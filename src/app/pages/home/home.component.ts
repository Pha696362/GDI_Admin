import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { AuthService } from './../../auth/auth.service';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AuthStore } from 'src/app/stores/auth.store';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user: any;
  single = [
    {
      'name': 'By Percentage',
      'value': 100
    },
    {
      'name': 'By Cash',
      'value': 50
    },
  ];
  multi = [

    {
      "name": "By Percentage",
      "series": [
        {
          "name": "2016",
          "value": 30
        },
        {
          "name": "2017",
          "value": 50
        }
      ]
    },
  
    {
      "name": "By Cash",
      "series": [
        {
          "name": "2016",
          "value": 50
        },
        {
          "name": "2017",
          "value": 80
        }
      ]
    },
    {
      "name": "By Percentage",
      "series": [
        {
          "name": "2017",
          "value": 50
        },
        {
          "name": "2018",
          "value": 100
        }
      ]
    },
  
    {
      "name": "By Cash",
      "series": [
        {
          "name": "2017",
          "value": 80
        },
        {
          "name": "2018",
          "value": 90
        }
      ]
    },
  ];
  view: any[] = [];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = '';
  showYAxisLabel = false;
  showDataLabel = true;
  legend = false;
  legendTitle = '';
  yAxisLabel = '';
  // showGridLines = true;
  colorScheme = {
    domain: ['#4DB6AC', '#FF8F00']
  };
  constructor(private auth: AuthStore,
    private router: Router,
    // private terms: Terms,
    // private campus: Campus,
    // private institute: Institute,
    public dialog: MatDialog) { }

  logout() {
    this.auth.signOut();
  }

  onSelect($event) {

  }
  
  ngOnInit() {
    // this.user = this.auth.getUser();
  }


}
