import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoryData, DatabaseService, ItemData } from '../../../services/database.service';

@Component({
  selector: 'app-item-edit',
  templateUrl: './item-edit.component.html',
  styleUrls: ['./item-edit.component.scss'],
})
export class ItemEditComponent implements OnInit {

  @Input() title: string;
  @Input() item: ItemData;

  private itemForm: FormGroup;
  public categories: CategoryData[];

  constructor(private formBuilder: FormBuilder, private modalCtrl: ModalController, private db: DatabaseService) {
    this.itemForm  = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      expected: ['', Validators.required],
      id_category: ['', Validators.required],
      spent: ['', Validators.required],
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


    if(this.item) {
      this.itemForm.get('id').setValue(this.item.id);
      this.itemForm.get('name').setValue(this.item.name);
      this.itemForm.get('expected').setValue(this.item.expected);
      this.itemForm.get('id_category').setValue(this.item.id_category);

      this.item.spent != 0 ? this.itemForm.get('spent').setValue(this.item.spent) : this.itemForm.get('spent').setValue(this.item.expected);
    }
    else {
      this.itemForm.get('spent').setValue(0);
    }
  }

  getNowTime()
  {
    return "2019-03-08";
  }

  compareId(catId)
  {
    console.log(catId, this.item ? this.item.id_category == catId : false);
    return this.item ? this.item.id_category == catId : false;
  }

  onSubmit() {

    console.log("valor default: "+ this.itemForm.get('id_category').value)
    let itemm: ItemData;
    
    itemm = {
      id: this.itemForm.get('id').value ? this.itemForm.get('id').value : null,
      name: this.itemForm.get('name').value,
      datetime_cr: this.item ? this.item.datetime_cr : this.getNowTime(),
      expected: this.itemForm.get('expected').value,
      id_category: this.item ? this.itemForm.get('id_category').value : 1, 
      category: null,
      bought: this.item ? this.item.bought : 0,
      spent: this.itemForm.get('spent').value,
      datetime_b: this.item ? this.item.datetime_b : " ",
      photo: null,
    }

    this.modalCtrl.dismiss({
      'data': itemm
    });
  }

  dismissModal() {
    this.modalCtrl.dismiss(null);
  }

  deleteItem(id: number) {
    this.db.deleteItem(id)
      .then(() => {
        console.log('Item deleted');

        this.dismissModal();

        //this.updateItemList();
      })
      .catch((err) => {
        console.error('Item could not be deleted');
        console.error(err);

        //this.displayError('Can\'t delete. There are dependant periods!');
      });
  }

}
