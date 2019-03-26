import { Component, OnInit } from '@angular/core';
import { ToastController, ModalController } from '@ionic/angular';
import { DatabaseService, ExpenseData, CategoryData, ExpenseDataTotal, TransactionData } from '../../../services/database.service';

@Component({
  selector: 'app-flux',
  templateUrl: './flux.page.html',
  styleUrls: ['./flux.page.scss'],
})
export class FluxPage implements OnInit {


  public transactions: TransactionData;
  public categories: CategoryData[];

  private ready = false;

  constructor(private db: DatabaseService, private toastCtrl: ToastController, private modalController: ModalController) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    //this.updateFluxList();

    this.transactions = {
      total: 500,
      transactions: [
        {
          id: 1,
          name: "Oi",
          value: 100,
          datetime: "2019-03-22",
          idCategory: 1,
          category: {
            id: 1,
            name: "comida",
          }
        }
        ,
        {
          id: 2,
          name: "Tchau",
          value: 600,
          datetime: "2019-03-22",
          idCategory: 1,
          category: {
            id: 1,
            name: "comida",
          }
        }
        ,
        {
          id: 3,
          name: "Xesq",
          value: 25,
          datetime: "2019-03-23",
          idCategory: 1,
          category: {
            id: 1,
            name: "comida",
          }
        }

      ]
    }
  }

  private updateFluxList() {
    this.db.listFlux()
      .then(
        (transactions: TransactionData) => {

          this.transactions = transactions;
          this.ready = true;
        }
      )
      .catch(
        (err) => {
          console.error("Unable to load transactions!");
          console.error(err);
        }
      );
  }

}
