import { Component } from '@angular/core';

import { Hero } from './hero';

@Component({
  selector: 'hero-form',
  templateUrl: './hero-form.component.html'
})

export class HeroFormComponent {

  powers = ['Really Smart', 'Super Flexible',
            'Super Hot', 'Weather Changer'];

  model = new Hero(18, 'Dr IQ1', this.powers[0], 'Chuck Overstreet');

  submitted = false;

  isSpecial = "aaa";

  onSubmit() { 
  	console.log(this.submitted);
  	this.submitted = !this.submitted; 
  }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }
}
