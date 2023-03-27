import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { firebaseConfig } from '../app-config';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

	apiKey = firebaseConfig.databaseURL;


  constructor(private http: HttpClient) { }

	generateFake(count: number): Array<number> {
		const indexes = [];
		for (let i = 0; i < count; i++) {
			indexes.push(i);
		}
		return indexes;
	}

	onContact(item:{name:any,email:any,message:any}) {
		return this.http.post<any>(`${this.apiKey}/query.json`, {
			name : item.name,
			email : item.email,
			message : item.message
		})
	}

	getContact() {
		return this.http.get<any>(`${this.apiKey}/query.json`).pipe(map((resData: any) => {
			// console.log(resData);
			const userArrayTwo: any = [];
			for(const id in resData) {
			  // console.log(id);
			  // console.log(resData[id])
			  if(resData.hasOwnProperty(id)) {
				userArrayTwo.push({
				  id: id, ...resData[id]
				});
			  }
			}
			return userArrayTwo
		  }));
	}

}
