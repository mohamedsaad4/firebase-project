import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-myskills',
  templateUrl: './myskills.component.html',
  styleUrls: ['./myskills.component.css']
})
export class MyskillsComponent implements OnInit {

  itemList: AngularFireList<any>

  itemArray = [];

  data = {
    name: '',
    phone: '',
    skill: '',
    price: '',
    comment: ''
  };

  myUid: any;

  constructor(public db: AngularFireDatabase) {
    this.itemList = db.list('skills');

    this.myUid = localStorage.getItem('uid');

    this.itemList.snapshotChanges().subscribe(actions => {
      actions.forEach(action => {
        let y = action.payload.toJSON();
        y['$key'] = action.key;
        this.itemArray.push(y as listItemClass);
      });

      console.log(this.itemArray);
    });
   }

  ngOnInit() {
  }

  editForm($key) {
    for (let value of this.itemArray) {
      if (value['$key'] == $key) {
        this.data.name = value['name'];
        this.data.phone = value['phone'];
        this.data.price = value['price'];
        this.data.skill = value['skill'];
        this.data.comment = value['comment'];
      }
    }
  }

  onEdit($key) {
    this.data.name
        this.data.phone
        this.data.price
        this.data.skill
        this.data.comment

        this.itemList.set($key, {
          name: this.data.name,
          phone: this.data.phone,
          skill: this.data.skill,
          price: this.data.price,
          comment: this.data.comment
        })

        this.itemArray = []
    //to edit data on firebase
    /* this.itemList.set($key, {
      name: this.data.name,
      phone: this.data.phone,
      skill: this.data.skill,
      price: this.data.price,
    });

    this.itemArray = []; */
  }

  onDelete($key) {
    /* this.itemList.remove($key); */
    this.itemList.remove($key)
    this.itemArray = []
  }

}


export class listItemClass {
  $key: string;
  name: string;
  phone: string;
  skill: string;
  price: string;
  comment: string;
} 