import { Component } from '@angular/core';

interface MenuItem{
  title:string;
  route:string

}



@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css'
})
export class SideMenuComponent {

  public reactiveMenu:MenuItem[]=[
    {title:'Basic',route:'./reactive/basic'},
    {title:'Dinamicos',route:'./reactive/dynamic'},
    {title:'Switches',route:'./reactive/switches'},
  ];

  public authMenu:MenuItem[]=[
    {title:'Registro',route:'./auth'},
   
  ]

}
