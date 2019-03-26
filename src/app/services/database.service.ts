import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  id: string;

  constructor(private sqlite: SQLite) { 

    // For development only
    //this.resetDatabase();
    
  }

  resetDatabase() {
    this.sqlite.deleteDatabase({
      name: 'data.db',
      location: 'default'
    })
      .then(() => {
        console.log('Database deleted!');
      })
      .catch((err) => {
        console.error('Database could not be deleted');
        console.error(err);
      });
  }

  async getDatabase() {
    return this.sqlite.create({
      name: 'data.db',
      location: 'default'
    });
  }

  async createDatabase() {
    const db = await this.getDatabase();
    
    return await this.createDatabaseTables(db);
  }

  private createDatabaseTables(db: SQLiteObject) {
    return db.sqlBatch([
      'CREATE TABLE IF NOT EXISTS category (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL);',
      'CREATE TABLE IF NOT EXISTS expense (id INTEGER PRIMARY KEY AUTOINCREMENT, id_category INTEGER NOT NULL, name TEXT NOT NULL, value REAL NOT NULL, datetime TEXT NOT NULL, FOREIGN KEY (id_category) REFERENCES category(id) ON DELETE RESTRICT);',
      'CREATE TABLE IF NOT EXISTS gain (id INTEGER PRIMARY KEY AUTOINCREMENT, id_category INTEGER NOT NULL, name TEXT NOT NULL, value REAL NOT NULL, datetime TEXT NOT NULL, FOREIGN KEY (id_category) REFERENCES category(id) ON DELETE RESTRICT);',
      'CREATE TABLE IF NOT EXISTS tbitem (id INTEGER PRIMARY KEY AUTOINCREMENT, id_category INTEGER NOT NULL, name TEXT NOT NULL, datetime_b TEXT NOT NULL, datetime_cr TEXT NOT NULL, spent REAL NOT NULL, expected REAL NOT NULL, bought INTEGER NOT NULL, FOREIGN KEY (id_category) REFERENCES category(id) ON DELETE RESTRICT);',
    ]);
  }

  async saveCategory(category: CategoryData) {
    const db = await this.getDatabase();

    if(!category.id) {
      return db.executeSql('INSERT INTO category (name) VALUES (?);', [category.name]);
    } else {
      return db.executeSql('UPDATE category SET name=? WHERE id=?;', [category.name, category.id]);
    }
  }


  async getCategory(id: number): Promise<CategoryData> {

    const db = await this.getDatabase();

    const rs = await db.executeSql('SELECT * FROM category WHERE id=?;', [id]);

    return new Promise<CategoryData>((resolve, reject) => {
      if(rs) {
        if(rs.rows.length > 0) {
          resolve(rs.rows.item(0));
        } else {
          resolve(null);
        }
      } else {
        reject('Unable to load the category');
      }
    });
  }

  
  async listCategories(): Promise<CategoryData[]> {
    const db = await this.getDatabase();
      
    const rs = await db.executeSql('SELECT * FROM category ORDER BY name;', []);

    return new Promise<CategoryData[]>((resolve, reject) => {
      if(rs) {
        let categories: CategoryData[];

        categories = [];

        if(rs.rows.length > 0) {
          for(let i = 0; i < rs.rows.length; i++) {
            categories.push(rs.rows.item(i));
          }
        }

        resolve(categories);
      } else {
        reject('Invalid resultset');
      }
    });
  }

  async listExpenses(): Promise<ExpenseDataTotal> {
    const db = await this.getDatabase();
      
    const rs = await db.executeSql('SELECT * FROM expense ORDER BY name;', []);

    return new Promise<ExpenseDataTotal>((resolve, reject) => {
      if(rs) {

        let totalExpenses: ExpenseDataTotal;

        totalExpenses = {
          total: 0,
          expenses: []
        }

        if(rs.rows.length > 0) {
          for(let i = 0; i < rs.rows.length; i++) {

            let expense: ExpenseData;
            let rawExpense = rs.rows.item(i);

            this.getCategory(rawExpense.id_category)
              .then((category: CategoryData) => {

                expense = {
                  id: rawExpense.id,
                  name: rawExpense.name,
                  value: rawExpense.value,
                  datetime: rawExpense.datetime,
                  'category': category,
                  idCategory: rawExpense.id_category
                }

                totalExpenses.total = totalExpenses.total + rawExpense.value;
                totalExpenses.expenses.push(expense);

              })
          }
        }

        resolve(totalExpenses);

      } else {
        reject('Invalid resultset');
      }
    });
  }

  async listGains(): Promise<GainDataTotal> {
    const db = await this.getDatabase();
      
    const rs = await db.executeSql('SELECT * FROM gain ORDER BY name;', []);

    return new Promise<GainDataTotal>((resolve, reject) => {
      if(rs) {

        let totalGain: GainDataTotal;

        totalGain = {
          total: 0,
          gains: []
        }

        if(rs.rows.length > 0) {
          for(let i = 0; i < rs.rows.length; i++) {

            let gain: GainData;
            let rawGain = rs.rows.item(i);

            this.getCategory(rawGain.id_category)
              .then((category: CategoryData) => {

                gain = {
                  id: rawGain.id,
                  name: rawGain.name,
                  value: rawGain.value,
                  datetime: rawGain.datetime,
                  'category': category,
                  idCategory: rawGain.id_category
                }

                totalGain.gains.push(gain);
                totalGain.total = totalGain.total + rawGain.value;

              })
          }
        }

        resolve(totalGain);

      } else {
        reject('Invalid resultset');
      }
    });
  }

  async listFlux(): Promise<TransactionData> {
    const db = await this.getDatabase();
      
    const gains = await db.executeSql('SELECT * FROM gain ORDER BY id;', []);
    const expenses = await db.executeSql('SELECT * FROM expense ORDER BY id;', []);

    return new Promise<TransactionData>((resolve, reject) => {
      if(gains && expenses) {

        let transactions: TransactionData;

        transactions = {
          total: 0,
          transactions: []
        }

        if(gains.rows.length > 0) {
          for(let i = 0; i < gains.rows.length; i++) {

            let transaction: GainData;
            let rawGain = gains.rows.item(i);

            this.getCategory(rawGain.id_category)
              .then((category: CategoryData) => {

                transaction = {
                  id: rawGain.id,
                  name: rawGain.name,
                  value: rawGain.value,
                  datetime: rawGain.datetime,
                  'category': category,
                  idCategory: rawGain.id_category
                }

                console.log(transaction)

                transactions.transactions.push(transaction);
                transactions.total = transactions.total + rawGain.value;

              })
          }
        }

        if(expenses.rows.length > 0) {
          for(let i = 0; i < expenses.rows.length; i++) {

            let transaction: GainData;
            let rawExpense = expenses.rows.item(i);

            this.getCategory(rawExpense.id_category)
              .then((category: CategoryData) => {

                transaction = {
                  id: rawExpense.id,
                  name: rawExpense.name,
                  value: rawExpense.value,
                  datetime: rawExpense.datetime,
                  'category': category,
                  idCategory: rawExpense.id_category
                }

                console.log(transaction)

                transactions.transactions.push(transaction);
                transactions.total = transactions.total - rawExpense.value;

              })
          }
        }

        resolve(transactions);

      } else {
        reject('Invalid resultset');
      }
    });
  }

  async listItems(b: number): Promise<ItemData[]> {
    const db = await this.getDatabase();
      
    const rs = await db.executeSql('SELECT * FROM tbitem WHERE bought = ? ;', [b]);

    return new Promise<ItemData[]>((resolve, reject) => {
      if(rs) {

        let items: ItemData[] = [];

        if(rs.rows.length > 0) {
          for(let i = 0; i < rs.rows.length; i++) {

            let item: ItemData;
            let rawItem = rs.rows.item(i);

            this.getCategory(rawItem.id_category)
              .then((category: CategoryData) => {

                item = {

                  id: rawItem.id,
                  name: rawItem.name,
                  id_category: rawItem.id_category,
                  expected: rawItem.expected,
                  spent: rawItem.spent,
                  bought: rawItem.bought,
                  datetime_cr: rawItem.datetime_cr,
                  datetime_b: rawItem.datetime_b,
                  photo: null,
                  category: category
                }

                items.push(item);

              })
          }
        }

        resolve(items);

      } else {
        reject('Invalid resultset');
      }
    });
  }

  async saveItem(item: ItemData) {
    const db = await this.getDatabase();


    if(!item.id) {
      return db.executeSql('INSERT INTO tbitem (name, expected, datetime_cr, bought, id_category, datetime_b, spent) VALUES (?, ?, ?, ?, ?, ?, ?);', [item.name, item.expected, item.datetime_cr, 0, item.id_category, " ", 0]);
    } else {
      return db.executeSql('UPDATE tbitem SET name=?, expected=?, datetime_cr=?, datetime_b=?, bought=?, id_category=?, spent=? WHERE id=?;', [item.name, item.expected, item.datetime_cr, item.datetime_b, item.bought, item.id_category,  item.spent, item.id]);
    }
  }

  async saveExpense(expense: ExpenseData) {
    const db = await this.getDatabase();

    if(!expense.id) {
      return db.executeSql('INSERT INTO expense (name, value, datetime, id_category) VALUES (?, ?, ?, ?);', [expense.name, expense.value, expense.datetime, expense.idCategory]);
    } else {
      return db.executeSql('UPDATE expense SET name=?, value=?, datetime=?, id_category=? WHERE id=?;', [expense.name, expense.value, expense.datetime, expense.idCategory, expense.id]);
    }
  }

  async saveGain(gain: GainData) {
    const db = await this.getDatabase();

    if(!gain.id) {
      return db.executeSql('INSERT INTO gain (name, value, datetime, id_category) VALUES (?, ?, ?, ?);', [gain.name, gain.value, gain.datetime, gain.idCategory]);
    } else {
      return db.executeSql('UPDATE gain SET name=?, value=?, datetime=?, id_category=? WHERE id=?;', [gain.name, gain.value, gain.datetime, gain.idCategory, gain.id]);
    }
  }

  async deleteCategory(id: number) {
    return this.secureDeleteById('category', id);
  }

  async deleteExpense(id: number) {
    return this.secureDeleteById('expense', id);
  }

  async deleteGain(id: number) {
    return this.secureDeleteById('gain', id);
  }

  async deleteItem(id: number) {
    return this.secureDeleteById('tbitem', id);
  }

  private async secureDeleteById(table: string, id: number) {
    const db = await this.getDatabase();
    
    await db.executeSql('PRAGMA foreign_keys=ON;', []);
    
    let query = 'DELETE FROM ' + table + ' WHERE id=?;'

    console.log(query);

    return db.executeSql(query, [id]);
  }

}

export interface CategoryData {
  id: number;
  name: string;
}

export interface ExpenseData {
  id: number;
  name: string;
  value: number;
  datetime: string;
  idCategory: number;
  category: CategoryData;
}

export interface GainData {
  id: number;
  name: string;
  value: number;
  datetime: string;
  idCategory: number;
  category: CategoryData;
}

export interface GainDataTotal {
  total: number;
  gains: GainData[];
}

export interface ExpenseDataTotal {
  total: number;
  expenses: ExpenseData[];
}

export interface TransactionData {
  total: number;
  transactions: GainData[];
}

export interface ItemData {
  id: number,
  name: string,
  id_category: number,
  expected: number,
  spent: number,
  bought: number,
  datetime_cr: string,
  datetime_b: string,
  photo: null,
  category: CategoryData
}


