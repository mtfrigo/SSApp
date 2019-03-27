import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ExpenseData, CategoryData, DatabaseService, GainData } from '../../../../services/database.service';

@Component({
  selector: 'app-expense-edit',
  templateUrl: './expense-edit.component.html',
  styleUrls: ['./expense-edit.component.scss'],
})
export class ExpenseEditComponent implements OnInit {

  @Input() title: string;
  @Input() expense: ExpenseData;

  private expenseForm: FormGroup;
  public categories: CategoryData[];

  constructor(private formBuilder: FormBuilder, private modalCtrl: ModalController, private db: DatabaseService) {
    
    this.expenseForm  = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      datetime: ['', Validators.required],
      value: ['', Validators.required],
      idCategory: ['', Validators.required],
    });
  }

  ngOnInit() {

    this.db.listCategories()
      .then(
        (categories: CategoryData[]) => {
          this.categories = categories;
        }
      )
      .catch(
        (err) => {
          console.error("Unable to load categories!");
          console.error(err);
      }
    );

    if(this.expense) {
      this.expenseForm.get('id').setValue(this.expense.id);
      this.expenseForm.get('name').setValue(this.expense.name);
      this.expenseForm.get('datetime').setValue(this.expense.datetime);
      this.expenseForm.get('value').setValue(this.expense.value);
      this.expenseForm.get('idCategory').setValue(this.expense.idCategory);
    }
  }

  onSubmit() {
    let expense: ExpenseData;
    
    expense = {
      id: this.expenseForm.get('id').value ? this.expenseForm.get('id').value : null,
      name: this.expenseForm.get('name').value,
      datetime: this.expenseForm.get('datetime').value,
      value: this.expenseForm.get('value').value,
      idCategory: this.expenseForm.get('idCategory').value,
      category: null,
    }

    this.modalCtrl.dismiss({
      'data': expense
    });
  }

  dismissModal() {
    this.modalCtrl.dismiss(null);
  }

  deleteExpense(id: number) {
    this.db.deleteExpense(id)
      .then(() => {
        console.log('Expense deleted');

        this.dismissModal();

        //this.updateExpenseList();
      })
      .catch((err) => {
        console.error('Expense could not be deleted');
        console.error(err);

        //this.displayError('Can\'t delete. There are dependant periods!');
      });
  }

}
