import { Environment } from './../../stores/environment.store';
import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { LocalStorage, JSONSchema } from "@ngx-pwa/local-storage";
import { Utils } from "../../services/utils.lib";
import { ActivatedRoute } from "@angular/router";
import { Pages } from 'src/app/dummy/pages';

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"]
})
export class SidebarComponent implements OnInit {
  @Input() data:any;
  @Output() onPress=new EventEmitter();
  id:string;
  logo=Pages.logo;
  management:any

  expansions = {
    hr: false,
    apo: false,
    epo: false,
    testcenter: false,
    enrollment: false,
    cashiers: false,
    scholarship: false,
    faculty: false,
    registra: false,
    admin: false,
    payroll: false
  };
  toggleSidebar: boolean = true;
  disabled: boolean = true;
  programId: string = '';
  constructor(protected localStorages: LocalStorage,
    public env:Environment,
    private route: ActivatedRoute) { }

  ngOnInit() {
    // this.route.params.subscribe(param => {
    //   console.log(param,'param in side bar')
    // })
    if (Utils.getLocalstorageItem('programId'))
      this.programId = Utils.getLocalstorageItem('programId');

    this.localStorages.getItem("toggleSidebar").subscribe(toggleSidebar => {
      this.toggleSidebar = toggleSidebar;
      this.disabled = this.toggleSidebar;
      if (!this.toggleSidebar) {
        let body = document.getElementsByClassName("page-wrapper")[0];
        body.classList.toggle("toggled-sidebar");
      }
    });
    const schema: JSONSchema = {
      properties: {
        hr: { type: "boolean" },
        apo: { type: "boolean" },
        epo: { type: "boolean" },
        testcenter: { type: "boolean" },
        enrollment: { type: "boolean" },
        cashiers: { type: "boolean" },
        scholarship: { type: "boolean" },
        faculty: { type: "boolean" },
        registra: { type: "boolean" },
        admin: { type: "boolean" },
        payroll: { type: "boolean" }
      }
    };
    this.localStorages.getItem<any>("expansions", { schema }).subscribe(
      expansion => {
        if (expansion) this.expansions = expansion;
        else {
          this.localStorages
            .setItem("expansions", this.expansions)
            .subscribe(() => { }, error => { });
        }
      },
      error => { }
    );
  }
  togglesidebar() {
    let body = document.getElementsByClassName("page-wrapper")[0];
    body.classList.toggle("toggled-sidebar");
    this.toggleSidebar = !this.toggleSidebar;
    this.localStorages
      .setItem("toggleSidebar", this.toggleSidebar)
      .subscribe(() => { });
  }

  onOpened(i) {
    const isopen = true;
    switch (i) {
      case 0:
        this.expansions.testcenter = isopen;
        break;
      case 1:
        this.expansions.enrollment = isopen;
        break;
      case 2:
        this.expansions.cashiers = isopen;
        break;
      case 3:
        this.expansions.apo = isopen;
        break;
      case 4:
        this.expansions.faculty = isopen;
        break;
      case 5:
        this.expansions.epo = isopen;
        break;
      case 6:
        this.expansions.scholarship = isopen;
        break;
      case 7:
        this.expansions.hr = isopen;
        break;
      case 8:
        this.expansions.registra = isopen;
        break;
      case 9:
        this.expansions.admin = isopen;
        break;
      case 10:
        this.expansions.payroll = isopen;
        break;
      default:
        break;
    }
    this.localStorages
      .setItem("expansions", this.expansions)
      .subscribe(() => { }, error => { });
  }
  onClosed(i) {
    const isopen = false;
    switch (i) {
      case 0:
        this.expansions.testcenter = isopen;
        break;
      case 1:
        this.expansions.enrollment = isopen;
        break;
      case 2:
        this.expansions.cashiers = isopen;
        break;
      case 3:
        this.expansions.apo = isopen;
        break;
      case 4:
        this.expansions.faculty = isopen;
        break;
      case 5:
        this.expansions.epo = isopen;
        break;
      case 6:
        this.expansions.scholarship = isopen;
        break;
      case 7:
        this.expansions.hr = isopen;
        break;
      case 8:
        this.expansions.registra = isopen;
        break;
      case 9:
        this.expansions.admin = isopen;
        break;
      case 10:
        this.expansions.payroll = isopen;
        break;
      default:
        break;
    }
    this.localStorages
      .setItem("expansions", this.expansions)
      .subscribe(() => { }, error => { });
  }

  _onSelected(item){
    this.onPress.emit(item)
  }

}
