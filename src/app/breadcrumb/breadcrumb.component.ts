import { Component, OnInit, Input } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Product } from '../product.model';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {
  @Input() data!: Product;
  @Input() category!: string;

  cats: string[] = [];
  routes: string[] = [];

  constructor(private firestore: AngularFirestore,) { }

  ngOnInit(): void {
    if(this.category != undefined){
      this.cats.push(this.category.replace('NULL', 'All'));
      this.crumb();
    } else if(this.data != undefined){
      this.cats = this.data.category;
      this.category = this.cats[0];
      this.crumb();
    }

    console.log(this.data  ,this.cats, 'IS COOKING')
  }

  ngOnChanges() :void{
    if(this.category != undefined){
      this.cats.push(this.category.replace('NULL', 'All'));
      this.crumb();
    } else if(this.data != undefined){
      this.cats = this.data.category;
      this.category = this.cats[0];
      this.crumb();
    }

    

    console.log("CHANGE" ,this.data  ,this.cats, 'IS COOKING')
  }

  async crumb(){
    var docs = await this.firestore.collection("category").ref.where('category', 'array-contains-any', this.cats).limit(1).get();
    this.cats = [];
    this.routes = [];
    if(docs.docs.length > 0){
      this.cats.push('Home');
      this.routes.push("");
      this.cats.push(docs.docs[0].id);
      this.routes.push("productlists/" + docs.docs[0].id + "/"+ docs.docs[0].id);
      this.cats.push(this.category.replace('NULL', 'All'));
      this.routes.push("productlists/" + this.category + "/"+ this.category);
    } else {
      this.cats.push('Home');
      this.routes.push("");
      this.cats.push(this.category.replace('NULL', 'All'));
      this.routes.push("productlists/" + this.category + "/"+ this.category);
    }

    if(this.data != undefined){
      this.cats.push(this.data.name);
      this.routes.push("productlists/" + this.data.name + "/"+ this.data.name);
    }

    this.cats = this.removeDuplicates(this.cats);
    this.routes = this.removeDuplicates(this.routes);

    console.log(this.routes)
  }

  removeDuplicates(array) {
    return array.filter((a, b) => array.indexOf(a) === b)
  };

}
