import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoryData, DatabaseService, GainData } from '../../../../services/database.service';

@Component({
  selector: 'app-gain-edit',
  templateUrl: './gain-edit.component.html',
  styleUrls: ['./gain-edit.component.scss'],
})
export class GainEditComponent implements OnInit {

  @Input() title: string;
  @Input() gain: GainData;

  private gainForm: FormGroup;
  public categories: CategoryData[];

  constructor(private formBuilder: FormBuilder, private modalCtrl: ModalController, private db: DatabaseService) {
    this.gainForm  = this.formBuilder.group({
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


    if(this.gain) {
      this.gainForm.get('id').setValue(this.gain.id);
      this.gainForm.get('name').setValue(this.gain.name);
      this.gainForm.get('datetime').setValue(this.gain.datetime);
      this.gainForm.get('value').setValue(this.gain.value);
      this.gainForm.get('idCategory').setValue(this.gain.idCategory);
    }
  }

  onSubmit() {
    let gain: GainData;
    
    gain = {
      id: this.gainForm.get('id').value ? this.gainForm.get('id').value : null,
      name: this.gainForm.get('name').value,
      datetime: this.gainForm.get('datetime').value,
      value: this.gainForm.get('value').value,
      idCategory: this.gainForm.get('idCategory').value,
      category: null,
    }

    this.modalCtrl.dismiss({
      'data': gain
    });
  }

  dismissModal() {
    this.modalCtrl.dismiss(null);
  }

  deleteGain(id: number) {
    this.db.deleteGain(id)
      .then(() => {
        console.log('Gain deleted');

        this.dismissModal();

        //this.updateGainList();
      })
      .catch((err) => {
        console.error('Gain could not be deleted');
        console.error(err);

        //this.displayError('Can\'t delete. There are dependant periods!');
      });
  }

}
