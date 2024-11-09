import { Component, Renderer2 } from '@angular/core';
import {environment} from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private renderer: Renderer2) {}

  ngOnInit() {
    this.loadGoogleMapsScript();
  }

  loadGoogleMapsScript() {
    const script = this.renderer.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${environment.googleMapsApiKey}&callback=initMap&v=weekly&libraries=marker`;
    script.defer = true;
    this.renderer.appendChild(document.body, script);
  }
}
