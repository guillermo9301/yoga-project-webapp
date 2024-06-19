import { AfterViewInit, Component, OnInit, Renderer2 } from '@angular/core';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'yoga-project-webapp';
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
