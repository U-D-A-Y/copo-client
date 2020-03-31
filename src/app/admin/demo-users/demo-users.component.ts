import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-demo-users',
  templateUrl: './demo-users.component.html',
  styleUrls: ['./demo-users.component.css']
})
export class DemoUsersComponent implements OnInit {

  user;
  data;
  i;
  constructor() { }

  ngOnInit(): void {
    this.i=100;
    this.user=[
      {
        id:1,
        name:"TJ",
        password:"12344",
        editing:false,
      },
      {
        id:2,
        name:"SIU",
        password:"12344",
        editing:false,
      },
      {
        id:3,
        name:"RDK",
        password:"12344",
        editing:false,
      },
    ]
    
  }
  activeEditMode(item){
    item.editing=true;
  }
  updateItem(item){
    item.editing=false;
  }

  addNewItem(){
    this.i++;
    let obj= {
      id:this.i,
      name:null,
      password:null,
      editing:true,
    };
    this.user.push(obj)
    console.log(this.user)
  }
  deleteItem(item){
    let index=this.user.findIndex(a=>a.id==item.id);
    this.user.splice(index,1)
  }

}
