import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder } from '@angular/forms';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { AddUserComponent } from '../../user/add-user/add-user.component';
// import { PERMISSION } from 'src/app/dummy/status';
import { Environment } from 'src/app/stores/environment.store';
import { DataService } from 'src/app/services/data.service';
import { IRole } from 'src/app/interfaces/bookstore';
import { Bookstore } from 'src/app/stores/bookstore';
import { ICreateBy } from 'src/app/interfaces/user';

@Component({
  selector: 'app-edit-role',
  templateUrl: './edit-role.component.html',
  styleUrls: ['./edit-role.component.scss']
})
export class EditRoleComponent implements OnInit {
  form: FormGroup;
  name: AbstractControl;
  aboutView = true;
  permisstions= this.data.permission;
  master_checked: boolean = false;
  master_indeterminate: boolean = false;
  // checkbox_list = [];
  master_about: boolean = false;

  constructor(private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddUserComponent>,
    public env: Environment,
    public ds : DataService,
    private snackBar: MatSnackBar,
    public bk : Bookstore
    ) {
  }

  buildForm(): void {
    this.form = this.fb.group({
      name: [this.data.name],
    });
    this.name = this.form.controls["name"];
  }
  ngOnInit() {
    this.buildForm();
  }

  create(f, isNew) {
    const create_by:ICreateBy = {
      key: this.env.users.key,
      name: this.env.users.name,
      email: this.env.users.email
    };
    const item: IRole = {
        key: this.data.key,
        name: f.name,
        create_date: this.data.create_date.toDate(),
        create_by: create_by,
        permission: this.permisstions
      };
    if (this.form.valid) {
      console.log(typeof this.permisstions,this.permisstions, 'hello');
      this.env.updateRole(this.ds.userRole(),item,(success,error) => {
          if (!isNew) this.dialogRef.close();
          this.snackBar.open("Role has been updated.", "done", {
            duration: 2500
          });
          this.form.enable();
          this.form.reset();
          // this.inputEl.nativeElement.focus();
      })
    }
  }
  master_change() {
    // for (let value of Object.values(this.permisstions)) {
    //   if(value.view === false) {
    //     value.edit = false
    //   }
      // console.log(value,'value from change master')
    // }
  }

  list_change(){
    // let checked_count = 0;
    // //Get total checked items
    // for (let value of Object.values(this.permisstions)) {
    //   // console.log(value,'value value value')
    // }
    // for (let value of Object.values(this.permisstions)) {
    //   if(value.view)
    //   checked_count++;
    // }

    // if(checked_count>0 && checked_count<this.permisstions.length){
    //   // If some checkboxes are checked but not all; then set Indeterminate state of the master to true.
    //   this.master_indeterminate = true;
    // }else if(checked_count == this.permisstions.length){
    //   //If checked count is equal to total items; then check the master checkbox and also set Indeterminate state to false.
    //   this.master_indeterminate = false;
    //   this.master_checked = true;
    // }else{
    //   //If none of the checkboxes in the list is checked then uncheck master also set Indeterminate to false.
    //   this.master_indeterminate = false;
    //   this.master_checked = false;
    // }
  }

}
