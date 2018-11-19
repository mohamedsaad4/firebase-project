import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';




@Component({
  selector: 'app-addskills',
  templateUrl: './addskills.component.html',
  styleUrls: ['./addskills.component.css']
})
export class AddskillsComponent implements OnInit {

  data = {
    name: '',
    phone: '',
    skill: '',
    price: '',
    comment: ''
  };

  //item: Observable<any>;
  itemList: AngularFireList<any>

  constructor(public db: AngularFireDatabase, public router: Router) {
    this.itemList = db.list('skills')
   }

  ngOnInit() {
  }

  insertSkill() {

    //to add data to the firebase
    this.itemList.push({
      name: this.data.name,
      phone: this.data.phone,
      skill: this.data.phone,
      price: this.data.price,
      comment: this.data.comment
    });

  }

  navToMyskills() {
    setTimeout( () => {
      this.router.navigate(['/myskills']);
    }, 1000);
  }

}
