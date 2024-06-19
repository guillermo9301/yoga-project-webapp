import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-estamos',
  templateUrl: './estamos.component.html',
  styleUrls: ['./estamos.component.css']
})
export class EstamosComponent implements OnInit, AfterViewInit {
  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.loadFacebookSDK();
  }

  loadFacebookSDK(): void {
    if ((window as any).FB) {
      (window as any).FB.XFBML.parse();
    }
  }
}
