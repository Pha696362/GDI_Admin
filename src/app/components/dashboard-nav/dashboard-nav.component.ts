import { FILTER_OPTIONS } from './../../dummy/status';
import { Search } from './../../stores/search.store';
import { Router, ActivatedRoute } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Environment } from 'src/app/stores/environment.store';
import { switchMap, debounceTime, tap } from "rxjs/operators";
import { AuthStore } from 'src/app/stores/auth.store';
import { MatDialog } from '@angular/material';
import { ForgotUserPasswordComponent } from 'src/app/pages/user/forgot-user-password/forgot-user-password.component';
import { EditUserComponent } from 'src/app/pages/user/edit-user/edit-user.component';

@Component({
  selector: 'app-dashboard-nav',
  templateUrl: './dashboard-nav.component.html',
  styleUrls: ['./dashboard-nav.component.scss']
})
export class DashboardNavComponent implements OnInit {
  formFocus: boolean;
  form: FormGroup;
  search: AbstractControl;
  searchType: AbstractControl;

  filterBy = FILTER_OPTIONS;
  loading: boolean = false;
  filter: string[] = ['name', 'year', 'month'];


  constructor(private fb: FormBuilder,
    public auth: AuthStore,
    public env: Environment,
    public store: Search,
    public route:ActivatedRoute,
    public dialog: MatDialog,
    private router: Router) { }

  ngOnInit() {
    this.form = this.fb.group({
      searchType: [{ value: this.filterBy[0], disabled: true }, [Validators.required]],
      search: [null]
    });
    this.search = this.form.controls["search"];
    this.searchType = this.form.controls["searchType"];
    this.store.fetchData(this.filterBy[0].key, null);
    // this.search.valueChanges
    //   .pipe(
    //     debounceTime(Pages.debounceTime),
    //     tap(() => (this.loading = true)),
    //     switchMap(value => this.store.search(this.searchType.value.key, value))
    //   )
    //   .subscribe(results => {
    //     this.store.data = results;
    //     this.loading = false;
    //   });
  }

  displayItem(item: any): string {
    if (this.searchType) {
      const { key } = this.searchType.value;
      return item ? item[key] : item;
    }
    return item ? item.puc_id : item;
  }

  compareObjects(o1: any, o2: any): boolean {
    if (o2) {
      return o1.text === o2.text;
    }
  }

  _onFocus(yes) {
    this.formFocus = yes;
  }

  logOut() {
    this.auth.signOut();
  }

  _optionSelected(item: any) {
    this.router.navigate([`/crime-profile/${item.key}/overview`])
  }

  _onSearch(f: any) {

  }

  changePassword() {
      let dialogRef = this.dialog.open(ForgotUserPasswordComponent, {
        data: null,
        width: '35vw',
        height: '100vh',
        role: 'dialog',
      });
      dialogRef.updatePosition({ top: '0', right: '0', bottom: '0' });
  }
  UpdateProfile() {
    let dialogRef = this.dialog.open(EditUserComponent, {
      data: this.env.users,
      width: '35vw',
      height: '100vh',
      role: 'dialog',
    });
    dialogRef.updatePosition({ top: '0', right: '0', bottom: '0' });
  }

}
