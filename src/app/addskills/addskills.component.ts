import { AngularFireAuth } from '@angular/fire/auth';
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

  email:string;

  uid: any;

  constructor(public db: AngularFireDatabase, public router: Router, private fire: AngularFireAuth) {
    this.itemList = db.list('skills')
   }

  ngOnInit() {
      let user = this.fire.auth.currentUser.email || localStorage.getItem('email');
      this.email = user;

      this.uid = this.fire.auth.currentUser.email || localStorage.getItem('uid');
      console.log(user);
      this.fire.authState.subscribe(auth => {
        if (auth) {
          this.uid =auth.uid;
        }
      });
  }

  insertSkill() {

    //to add data to the firebase
    this.itemList.push({
      name: this.data.name,
      phone: this.data.phone,
      skill: this.data.skill,
      price: this.data.price,
      comment: this.data.comment,
      email: this.email,
      uid: this.uid
    });

  }

  navToMyskills() {
    setTimeout( () => {
      this.router.navigate(['/myskills']);
    }, 1000);
  }

}
