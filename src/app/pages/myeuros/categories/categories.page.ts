import { Component, OnInit } from '@angular/core';
import { CategoryData, DatabaseService } from '../../../services/database.service';
import { ToastController, ModalController } from '@ionic/angular';
import { CategoriesEditComponent } from './categories-edit/categories-edit.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {

  public categories: CategoryData[];
  
  constructor(private db: DatabaseService, private toastCtrl: ToastController, private modalController: ModalController) { }

  ngOnInit() {

  }

  async presentModal(category: CategoryData) {
    const modal = await this.modalController.create({
      component: CategoriesEditComponent,
      componentProps: { 
        title: "New Category",
        category: category 
      },
      cssClass: 'custom-modal'

    });

    
    await modal.present();

    const { data } = await modal.onDidDismiss();

    if (data) {

      this.db.saveCategory(data.data)
        .then(() => {
          console.log('Category successfully saved');
          this.displaySuccess('Gain saved');

        })
        .catch((err) => {
          console.error('Unable to save the category');
          console.error(err);

          this.displayError('Unable to save the category');
        });
    }

    this.updateCategoryList();

  }

  ionViewWillEnter() {
    this.updateCategoryList();
  }

  deleteCategory(id: number) {
    this.db.deleteCategory(id)
      .then(() => {
        console.log('Category deleted');

        this.updateCategoryList();
      })
      .catch((err) => {
        console.error('Category could not be deleted');
        console.error(err);

        this.displayError('Can\'t delete. There are dependant periods!');
      });
  }

  private updateCategoryList() {
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
