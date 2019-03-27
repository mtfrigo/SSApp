import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoryData, DatabaseService, GainData } from '../../../../services/database.service';

@Component({
  selector: 'app-categories-edit',
  templateUrl: './categories-edit.component.html',
  styleUrls: ['./categories-edit.component.scss'],
})
export class CategoriesEditComponent implements OnInit {

  @Input() title: string;
  @Input() category: CategoryData;

  private categoryForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private modalCtrl: ModalController, private db: DatabaseService) { 
    
    this.categoryForm  = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
    });
  }

  ngOnInit() {

    if(this.category) {
      this.categoryForm.get('id').setValue(this.category.id);
      this.categoryForm.get('name').setValue(this.category.name);
    }
  }

  onSubmit() {
    let category: CategoryData;
    
    category = {
      id: this.categoryForm.get('id').value ? this.categoryForm.get('id').value : null,
      name: this.categoryForm.get('name').value,
    }

    this.modalCtrl.dismiss({
      'data': category
    });
  }

  dismissModal() {
    this.modalCtrl.dismiss(null);
  }

  deleteCategory(id: number) {
    this.db.deleteCategory(id)
      .then(() => {
        console.log('Category deleted');

        this.dismissModal();

        //this.updateGainList();
      })
      .catch((err) => {
        console.error('Category could not be deleted');
        console.error(err);

        //this.displayError('Can\'t delete. There are dependant periods!');
      });
  }

}
