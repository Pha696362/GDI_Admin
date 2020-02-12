import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { AdvertisementStore } from 'src/app/stores/advertisement.store';
import { MatSnackBar, MatDialog } from '@angular/material';
import { DataService } from 'src/app/services/data.service';
import { IGenre, IAdvertise } from 'src/app/interfaces/bookstore';
import { DeleteComponent } from 'src/app/components/delete/delete.component';
import { tabs } from 'src/app/dummy/tabs';
import { Bookstore } from 'src/app/stores/bookstore';
import { WEB_ADVERTISEMENT_TYPE, Advertise_Status } from 'src/app/dummy/status';
import { Environment } from 'src/app/stores/environment.store';
import { AddNewWebAdvertisementComponent } from './add-new-web-advertisement/add-new-web-advertisement.component';
import { EditWebAdvertisementComponent } from './edit-web-advertisement/edit-web-advertisement.component';

@Component({
  selector: 'app-web-advertisement',
  templateUrl: './web-advertisement.component.html',
  styleUrls: ['./web-advertisement.component.scss']
})
export class WebAdvertisementComponent implements OnInit {
  ADS = WEB_ADVERTISEMENT_TYPE;
  tabs = tabs.webAdvertise;
  selectedAdsTypeKey = -1;
  param = 'All';
  selectedTab:any = {};

  constructor(public env: Environment,
    public adStore: AdvertisementStore,
    public store: Bookstore,
    private snackBar: MatSnackBar,
    private ds: DataService,
    public dialog: MatDialog,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.switchTab(params.get('id'));
      // this.param = params.get('id');
      // console.log(this.param);
      this.adStore.fetchAdsByFilter(this.selectedTab , this.selectedAdsTypeKey,'web_advertisement');
    });
  }

  switchTab(text){
    // console.log("text", text)
    switch (text) {
      case 'all':
        this.selectedTab = {};
        this.selectedTab.text = 'All';
        // console.log("this.selectedTab", this.selectedTab)
        break;
      case 'pending':
        this.selectedTab = Advertise_Status.find(ads => ads.key == 3);
        break;
      case 'near-expire':
        this.selectedTab = {};
        this.selectedTab.text = 'Near Expire';
        break;
      case 'expired':
        this.selectedTab = Advertise_Status.find(ads => ads.key == 4);
        break;
    }
  }


  _selectionChange(event) {
    this.selectedAdsTypeKey = event.value;
    if (this.selectedAdsTypeKey) {
      // this.adStore.fetchAdsById(this.selectedAdsTypeKey);
      // console.log("select change")
      this.adStore.fetchAdsByFilter(this.selectedTab,this.selectedAdsTypeKey,'web_advertisement');
    }
    else {
      // this.store.fetchData(this.ds.contentRef());
      console.log('error fect by id')

    }
  }


  _onFilter(tab : string) {
    this.switchTab(tab);

    // console.log("this.selectedTab", this.selectedTab)

    this.adStore.fetchAdsByFilter(this.selectedTab,this.selectedAdsTypeKey,'web_advertisement');
    // if (tab) {
    //   this.adStore.fetchAdsByFilter(this.param,this.selectedAdsTypeKey);
    // } else {
    //   // this.store.fetchData(this.ds.contentRef());
    // }
  }

  create() {
    let found;
    if(this.selectedAdsTypeKey !== -1){
      found = this.ADS.find(element => element.key === this.selectedAdsTypeKey);
    }
    else {
      found = this.ADS.find(element => element.key === 1)
     }
    let dialogRef = this.dialog.open(AddNewWebAdvertisementComponent, {
      data: found,
      width: '35vw',
      height: '100vh',
      role: 'dialog',
    });
    dialogRef.updatePosition({ top: '0', right: '0', bottom: '0' });
  }

  edit(item: IAdvertise) {
    let dialogRef = this.dialog.open(EditWebAdvertisementComponent, {
      data: item,
      width: '35vw',
      height: '100vh',
      role: 'dialog',
    });
    dialogRef.updatePosition({ top: '0', right: '0', bottom: '0' });
  }


  delete(item: IAdvertise) {
    let dialogRef = this.dialog.open(DeleteComponent, {
      data: { title: 'Delete Advertisement', memo: 'If advertisement is using by other function in system you cannot delete it.', name: item.name },
      width: '35vw',
      disableClose: true,
      role: 'dialog',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'yes') {
        this.store.delete(this.ds.webAdvertiseRef(), item, (success, error) => {
          if (success) {
            this.snackBar.open('Web Advertisement has been deleted.', 'done', { duration: 2000 });
          }
          else {
            this.snackBar.open(error, 'Error')
          }
        })
      }
    });
  }

}
