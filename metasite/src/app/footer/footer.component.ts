import { Component, OnInit } from '@angular/core';
import { faCloudUploadAlt, faSyncAlt, faStethoscope } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {

  icons = {
    'cloud': faCloudUploadAlt,
    'sync': faSyncAlt,
    'sthetoscope': faStethoscope
  };

  constructor() { }

  ngOnInit() {
  }

}
