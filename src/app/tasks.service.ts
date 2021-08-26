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
    return this.webReqService.post('lists', { title });
  }

  createTask(title: String, listId: String){
    return this.webReqService.post(`lists/${listId}/tasks`, {title});
  }

  getLists(){
    return this.webReqService.get('lists');
  }

  getTasks(listsId: String){
    return this.webReqService.get(`lists/${listsId}/tasks`);
  }
}
