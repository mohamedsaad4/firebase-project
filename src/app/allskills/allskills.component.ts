import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-allskills',
  templateUrl: './allskills.component.html',
  styleUrls: ['./allskills.component.css']
})
export class AllskillsComponent implements OnInit {

  itemList: AngularFireList<any>

  itemArray = [];

  data = {
    name: '',
    phone: '',
    skill: '',
    price: '',
    comment: ''
  };

  constructor(public db: AngularFireDatabase, private router: Router) {
    this.itemList = db.list('skills');

    this.itemList.snapshotChanges().subscribe(actions => {
      actions.forEach(action => {
        let y = action.payload.toJSON();
        y['$key'] = action.key;
        this.itemArray.push(y as listItemClass);
      });

    });
   }

  ngOnInit() {
  }


  moreInfo($key) {
    this.router.navigate(['details/' + $key]);
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