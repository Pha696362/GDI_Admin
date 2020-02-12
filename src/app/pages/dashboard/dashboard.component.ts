import { MatDialog } from '@angular/material';
import { Subscriber } from 'src/app/stores/subscriber.store';
import { FILTER_OPTIONS } from './../../dummy/status';
import { Router, ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import {
  trigger,
  style,
  transition,
  animate,
  query,
  stagger
} from "@angular/animations";
import { Environment } from "../../stores/environment.store";
import {
  AbstractControl,
  FormBuilder,
  Validators,
  FormGroup
} from "@angular/forms";
import { AuthStore } from 'src/app/stores/auth.store';
import { switchMap, debounceTime, tap } from "rxjs/operators";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
  animations: [
    trigger("explainerAnim", [
      transition("* => *", [
        // query(".ani-col", style({ opacity: 0, transform: "translateY(40px)" })),
        // query(
        //   ".ani-col",
        //   stagger("200ms", [
        //     animate(
        //       "500ms .3s ease-out",
        //       style({ opacity: 1, transform: "translateY(0)" })
        //     )
        //   ])
        // ),
        query(".ani-col", [animate(1000, style("*"))])
      ])
    ])
  ]
})
export class DashboardComponent implements OnInit {
  formFocus: boolean;
  form: FormGroup;
  search: AbstractControl;
  searchType: AbstractControl;
  filterBy = FILTER_OPTIONS;
  loading: boolean = false;

  constructor(private auth: AuthStore,
    private router: Router,
    public env: Environment,
    public store: Subscriber,
    private fb: FormBuilder,
    public dialog: MatDialog) { }

  logout() {
    this.auth.signOut()
  }

  ngOnInit() {
    this.form = this.fb.group({
      searchType: [this.filterBy[0], [Validators.required]],
      search: [null]
    });
    this.search = this.form.controls["search"];
    this.searchType = this.form.controls["searchType"];

    if (this.store.FILTER_OPTIONS_TYPES) {
      this.searchType.patchValue(this.store.FILTER_OPTIONS_TYPES);
    }

    const { searchType } = this.form.value;
    this.store.subscriberSearch(searchType.key);
    this.search.valueChanges
      .pipe(
        debounceTime(300),
        tap(() => (this.loading = true)),
        switchMap(value => this.store.search(this.searchType.value.key, value))
      )
      .subscribe(results => {
        this.store.memberships = results;
        this.loading = false;
      });
  }

  displayItem(item: any): string {
    if (this.searchType) {
      const { key } = this.searchType.value;
      return item ? item[key] : item;
    }
    return item ? item.fullName : item;
  }

  compareObjects(o1: any, o2: any): boolean {
    if (o2) {
      return o1.text === o2.text;
    }
  }

  _onFocus(yes) {
    this.formFocus = yes;
  }

  _selectionChange(event) {
    const { value } = event;
    this.store.FILTER_OPTIONS_TYPES = value;
  }

  _optionSelected(item: any) {
    this.router.navigate(["/client/" + item.key + "/overview/"]);
  }

}
