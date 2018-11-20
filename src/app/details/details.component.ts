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
    comment: ''
  };

  constructor(private route: ActivatedRoute, public db: AngularFireDatabase) {
    this.route.params.subscribe(params => { //params: will be an object: {id: "-Lskjdhfuehksjdnfsdf"}


    })

    this.itemList = db.list('skills');

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

}


export class listItemClass {
  $key: string;
  name: string;
  phone: string;
  skill: string;
  price: string;
  comment: string;
}
