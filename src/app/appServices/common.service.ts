import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

  generateFake(count: number): Array<number> {
		const indexes = [];
		for (let i = 0; i < count; i++) {
			indexes.push(i);
		}
		return indexes;
	}

}
