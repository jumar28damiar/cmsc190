import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-watersheddock',
  templateUrl: './watersheddock.component.html',
  styleUrls: ['./watersheddock.component.css']
})
export class WatersheddockComponent implements OnInit {
  h = (window.innerHeight*0.7) + 'px';
  constructor() { }

  ngOnInit() {
  }

}
