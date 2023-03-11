import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firebaseConfig } from '../app-config';
import { adminNotification } from '../user-type/admin/admin-layout/admin-notification/admin-notification.model';

@Injectable({
  providedIn: 'root'
})

export class AdminNotificationService {

  apiKey = firebaseConfig.databaseURL;

  constructor(private http : HttpClient) { }

  onCreateAdminNotification(notiMessage: {}) {
    return this.http.post<adminNotification>(`${this.apiKey}/admin-notification.json`, notiMessage); 
  }

  onGetAdminNotification() {
    return this.http.get<adminNotification>(`${this.apiKey}/admin-notification.json`);
  }

  onDeleteAdminNotification(id: any) {
    return this.http.delete(`${this.apiKey}/admin-notification/${id}.json`);
  }

}
