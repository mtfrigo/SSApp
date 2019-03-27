import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { DatabaseService } from './services/database.service';
import { Router, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  selectedPath = "";

  pages = [
    {
      title: "My Euros",
      url: "/myeuros"
    },
    {
      title: "To Buy",
      url: "/tobuy"
    },
    {
      title: "Recipes",
      url: "/recipes"
    },
    {
      title: "To Do",
      url: "/todo"
    },

  ]



  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private db: DatabaseService,
    private router: Router
    
  ) {

    this.router.events.subscribe((event: RouterEvent) => {

      if(event.url)
      {
        this.selectedPath = event.url;
        //console.log(this.selectedPath)
      }
        
    })
     
    this.initializeApp();
  }

  activePage(p)
  {
    //console.log(p.url, this.selectedPath, p.url == this.selectedPath);

    return p.url == this.selectedPath;
  }
  
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.db.createDatabase().then(
        () => {
          console.log('Database created successfully');
        }
      )
      .catch(
        (err) => {
          console.error('Error when creating the database!');
          console.error(err);
        }
      )
      .finally(
        () => {
          this.splashScreen.hide();
        }
      );

    });
  }
}
