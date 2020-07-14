import { Component, Input } from '@angular/core';

@Component({
  selector: 'eternal-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {
  @Input() name: string;
}
