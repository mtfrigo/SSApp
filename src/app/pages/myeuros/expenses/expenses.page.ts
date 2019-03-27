import { Component, OnInit } from '@angular/core';
import { ExpenseData, CategoryData, DatabaseService, ExpenseDataTotal } from '../../../services/database.service';
import { ToastController, ModalController } from '@ionic/angular';
import { ExpenseEditComponent } from './expense-edit/expense-edit.component';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.page.html',
  styleUrls: ['./expenses.page.scss'],
})
export class ExpensesPage implements OnInit {

  id: string;
  public expenses: ExpenseDataTotal;
  public categories: CategoryData[];

  public ready = false;
  
  constructor(private db: DatabaseService, private toastCtrl: ToastController, private modalController: ModalController) { }

  ngOnInit() {

  }

  async presentModal(expense: ExpenseData) {
    const modal = await this.modalController.create({
      component: ExpenseEditComponent,
      componentProps: { 
        title: "New Expense",
        expense: expense 
      },
      cssClass: 'custom-modal'

    });

    
    await modal.present();

    const { data } = await modal.onDidDismiss();

    if (data) {


      this.db.saveExpense(data.data)
        .then(() => {
          console.log('Expense successfully saved');

          this.displaySuccess('Expense saved');

        })
        .catch((err) => {
          console.error('Unable to save the Expense');
          console.error(err);

          this.displayError('Unable to save the Expense');
        });
    }

    this.updateExpenseList();

  }

  ionViewWillEnter() {
    this.updateExpenseList();
  }

  deleteExpense(id: number) {
    this.db.deleteExpense(id)
      .then(() => {
        console.log('Expense deleted');

        this.updateExpenseList();
      })
      .catch((err) => {
        console.error('Expense could not be deleted');
        console.error(err);

        this.displayError('Can\'t delete. There are dependant periods!');
      });
  }



  private updateExpenseList() {
    this.db.listExpenses()
      .then(
        (expenses: ExpenseDataTotal) => {

          console.log(expenses)

          this.ready = true;
          this.expenses = expenses;
        }
      )
      .catch(
        (err) => {
          console.error("Unable to load expenses!");
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
