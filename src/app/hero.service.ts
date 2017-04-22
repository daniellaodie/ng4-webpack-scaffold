import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { HEROES } from './mock-heroes'; 
import { Hero } from './hero';



@Injectable()
export class HeroService {

	private heroesUrl = 'http://www.bitonair.com/app/hello';
	constructor(
		private http: Http
	){}

	getHeroes(): Promise<Hero[]>{
		
		return this.http.get(this.heroesUrl)
		           .toPromise()
		           .then(response => response.json() as Hero[])
		           .catch(this.handleError);
	}

	private handleError(error: any): Promise<any> {
	  console.error('An error occurred', error); // for demo purposes only
	  return Promise.reject(error.message || error);
	}

	getHero(id: number): Promise<Hero> {
	  return this.getHeroes()
	             .then(heroes => heroes.find(hero => hero.id === id));
	}
}
