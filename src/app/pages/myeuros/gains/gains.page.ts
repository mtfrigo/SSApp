import { Component, OnInit } from '@angular/core';
import { GainData, CategoryData, DatabaseService, GainDataTotal } from '../../../services/database.service';
import { ToastController, ModalController } from '@ionic/angular';

import { GainEditComponent } from './gain-edit/gain-edit.component'
@Component({
  selector: 'app-gains',
  templateUrl: './gains.page.html',
  styleUrls: ['./gains.page.scss'],
})
export class GainsPage implements OnInit {

  id: string;
  public gainsTotal: GainDataTotal;

  public ready = false;

  constructor(private db: DatabaseService, private toastCtrl: ToastController, private modalController: ModalController) { }

  ngOnInit() {

  }

  async presentModal(gain: GainData) {
    const modal = await this.modalController.create({
      component: GainEditComponent,
      componentProps: { 
        title: "New Gain",
        gain: gain 
      },
      cssClass: 'custom-modal'

    });

    
    await modal.present();

    const { data } = await modal.onDidDismiss();

    if (data) {


      this.db.saveGain(data.data)
        .then(() => {
          console.log('Gain successfully saved');

          this.displaySuccess('Gain saved');

        })
        .catch((err) => {
          console.error('Unable to save the gain');
          console.error(err);

          this.displayError('Unable to save the gain');
        });
    }

    this.updateGainList();

  }

  ionViewWillEnter() {
    this.updateGainList();
  }

  deleteGain(id: number) {
    this.db.deleteGain(id)
      .then(() => {
        console.log('Gain deleted');

        this.updateGainList();
      })
      .catch((err) => {
        console.error('Gain could not be deleted');
        console.error(err);

        this.displayError('Can\'t delete. There are dependant periods!');
      });
  }



  private updateGainList() {

    this.db.listGains()
      .then(
        (gains: GainDataTotal) => {

          this.gainsTotal = gains;
          this.ready = true;

        }
      )
      .catch(
        (err) => {
          console.error("Unable to load gains!");
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
