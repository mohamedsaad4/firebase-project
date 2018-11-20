import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

  email: string;
  id: string;

  itemList: AngularFireList<any>;
  itemArray = [];

  data = {
    name: '',
    phone: '',
    age: '',
    address: '',
    city: '',
    job: '',
    email: ''
  };

  constructor(public db: AngularFireDatabase) {
    
    this.email = localStorage.getItem('email');
    this.id = localStorage.getItem('uid');
    
    this.itemList = db.list('users');

    this.itemList.snapshotChanges().subscribe(actions => {
      actions.forEach(action => {
        let y = action.payload.toJSON();
        y["$key"] = action.key;
        console.log(action.payload.toJSON());
        
        if(action.payload.child('uid').val() == this.id) {
          this.itemArray.push(y as ListItemClass);
          this.data.name = this.itemArray[0]['name'];
          this.data.phone = this.itemArray[0]['phone'];
          this.data.age = this.itemArray[0]['age'];
          this.data.address = this.itemArray[0]['address'];
          this.data.city = this.itemArray[0]['city'];
          this.data.job = this.itemArray[0]['job'];
          this.data.email = this.itemArray[0]['email'];

          this.data = this.itemArray[0];
          console.log(this.itemArray)
        }
      });
      
      
    });
  }
  
  ngOnInit() {
    console.log(this.data);
    console.log(this.email);
    console.log(this.id);
    
  }

}


export class ListItemClass {
  $key: string;
  name: string;
  phone: string;
  age: string;
  address: string;
  city: string;
  job: string;
  email: string;
} 
