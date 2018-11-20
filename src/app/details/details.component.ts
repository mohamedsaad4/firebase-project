import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  id: any;

  itemList: AngularFireList<any>;

  itemArray = [];

  data = {
    name: '',
    phone: '',
    skill: '',
    price: '',
    comment: '',
    email: ''
  };

  constructor(private route: ActivatedRoute, public db: AngularFireDatabase) {
    this.route.params.subscribe(params => { //params: will be an object: {id: "-Lskjdhfuehksjdnfsdf"}
      this.id = params;
    })

    this.itemList = db.list('skills');

    this.itemList.snapshotChanges().subscribe(actions => {
      actions.forEach(action => {
        let y = action.payload.toJSON();
        y['$key'] = action.key;
        
        if(action.key === this.id['id']) {
          this.itemArray.push(y as listItemClass);
          this.data.name = this.itemArray[0]['name'];
          this.data.phone = this.itemArray[0]['phone'];
          this.data.skill = this.itemArray[0]['skill'];
          this.data.price = this.itemArray[0]['price'];
          this.data.comment = this.itemArray[0]['comment'];
          this.data.email = this.itemArray[0]['email'];
        }
      });

      console.log(this.itemArray);
    });
   }

  ngOnInit() {
  }

}


export class listItemClass {
  $key: string;
  name: string;
  phone: string;
  skill: string;
  price: string;
  comment: string;
  email: string;
}
