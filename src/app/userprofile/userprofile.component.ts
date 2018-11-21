import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';


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
    email: '',
    image: ''
  };

  image: string = null

  userKey: any;

  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;

  download: Observable<any>;
  
  constructor(public db: AngularFireDatabase, private angfstorage: AngularFireStorage, private router: Router) {
    
    this.email = localStorage.getItem('email');
    this.id = localStorage.getItem('uid');
    
    this.itemList = db.list('users');
    
    this.itemList.snapshotChanges().subscribe(actions => {
      actions.forEach(action => {
        let y = action.payload.toJSON();
        y[this.userKey] = action.key;
        
        this.userKey = action.key;
        if(action.payload.child('uid').val() == this.id) {
          this.itemArray.push(y as ListItemClass);
          this.data.name = this.itemArray[0]['name'];
          this.data.phone = this.itemArray[0]['phone'];
          this.data.age = this.itemArray[0]['age'];
          this.data.address = this.itemArray[0]['address'];
          this.data.city = this.itemArray[0]['city'];
          this.data.job = this.itemArray[0]['job'];
          this.data.email = this.itemArray[0]['email'];
          this.data.image = this.itemArray[0]['image'];

          console.log(this.itemArray[0]);
        }
        
      });
      
      
    });
  }
  
  ngOnInit() {
    
  }


  onEdit() {

    this.itemList.set(this.userKey, {
      name: this.data.name,
      phone: this.data.phone,
      age: this.data.age,
      address: this.data.address,
      city: this.data.city,
      job: this.data.job,
      email: this.email,
      uid: this.id,
      image: this.image
    });  
        
  }

  reload() {
    location.reload();
  }

  onDelete($key) {
    this.itemList.remove($key)
    this.itemArray = []
  }

  upload(event){
    const id = Math.random().toString(36).substring(2);
    this.ref = this.angfstorage.ref(id);
    this.task = this.ref.put(event.target.files[0]);
    this.task.snapshotChanges().pipe(
      finalize(() => {
        this.download = this.ref.getDownloadURL()
        this.download.subscribe(url => {
          if (url) {
            this.image = url;
            this.reload();
          }
          this.itemList.set(this.id, {
            name: this.data.name,
            phone: this.data.phone,
            age: this.data.age,
            address: this.data.address,
            city: this.data.city,
            job: this.data.job,
            email: this.email,
            uid: this.id,
            image: this.image
          });
        });
      })
    )
    .subscribe();

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
