import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(
    private webReqService: WebRequestService
  ) { }

  createList(title: String){
    //we want to send a web request to create a list
    return this.webReqService.post('lists', { title });
  }

  getLists(){
    return this.webReqService.get('lists');
  }

  getTasks(listsId: String){
    return this.webReqService.get(`lists/${listsId}/tasks`);
  }
}
