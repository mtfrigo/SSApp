import { Component, OnInit } from '@angular/core';
import { DatabaseService, ItemData,  } from '../../services/database.service';
import { ToastController, ModalController } from '@ionic/angular';
import { ItemEditComponent } from './item-edit/item-edit.component';

@Component({
  selector: 'app-tobuy',
  templateUrl: './tobuy.page.html',
  styleUrls: ['./tobuy.page.scss'],
})
export class TobuyPage implements OnInit {
  

  public items: ItemData[] = [];
  public purchases: ItemData[] = [];

  public ready = false;

  constructor(private db: DatabaseService, private toastCtrl: ToastController, private modalController: ModalController) { }

  ngOnInit() {
  }

  comparePrices(item)
  {
    return item.spent < item.expected;
  }

  getNowTime()
  {
    var date = new Date();
    let datetext = date.toTimeString();
    datetext = datetext.split(' ')[0];

    return date.getDate() + '/' + (date.getMonth()  + 1) + '/' +  date.getFullYear();
  }

  saveItem(item)
  {

    item.bought ? item.bought = 1 : item.bought = 0;

    if(item.bought)
      item.datetime_b = this.getNowTime();

    console.log("save item (bf db)")
    console.log(item)

    this.db.saveItem(item)
      .then(() => {
        console.log('Item successfully saved');

        this.displaySuccess('Item saved');
        this.updateItemList();


      })
      .catch((err) => {
        console.error('Unable to save the Item');
        console.error(err);

        this.displayError('Unable to save the Item');
      });

  }

  async presentModal(item: ItemData) {

    

    const modal = await this.modalController.create({
      component: ItemEditComponent,
      componentProps: { 
        title: "New Item",
        item: item 
      },
      cssClass: 'custom-modal'

    });

    
    await modal.present();

    const { data } = await modal.onDidDismiss();

    if (data) {

      this.db.saveItem(data.data)
        .then(() => {
          console.log('Item successfully saved');

          this.displaySuccess('Item saved');

        })
        .catch((err) => {
          console.error('Unable to save the Item');
          console.error(err);

          this.displayError('Unable to save the Item');
        });
    }

    this.updateItemList();

  }

  ionViewWillEnter() {
    this.updateItemList();
  }

  deleteItem(id: number) {
    this.db.deleteItem(id)
      .then(() => {
        console.log('Item deleted');

        this.updateItemList();
      })
      .catch((err) => {
        console.error('Item could not be deleted');
        console.error(err);

        this.displayError('Can\'t delete. There are dependant categorys!');
      });
  }

  async updateItemList() {

    await this.db.listItems(0)
      .then(
        (items: ItemData[]) => {

          console.log("items")
          console.log(items)
          this.items = items;

        }
      )
      .catch(
        (err) => {
          console.error("Unable to load items!");
          console.error(err);
        }
      );

    await this.db.listItems(1)
      .then(
        (items: ItemData[]) => {

          console.log("purchases")
          console.log(items)

          this.purchases = items;

        }
      )
      .catch(
        (err) => {
          console.error("Unable to load items!");
          console.error(err);
        }
      );
  }

  async displaySuccess(message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'bottom',
      color: 'success'
    });

    toast.present();
  }

  async displayError(message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'bottom',
      color: 'danger'
    });

    toast.present();
  }

}
