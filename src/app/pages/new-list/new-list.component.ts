import { Component, OnInit } from '@angular/core';
import { TasksService } from 'src/app/tasks.service';

@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.scss']
})
export class NewListComponent implements OnInit {

  constructor(private taskService: TasksService) { }

  ngOnInit(): void {
  }

  createList(title: String){
    this.taskService.createList(title).subscribe((response: any) => {
      console.log(response)
      //now we navigate to /lists/response._id
      
    })
  }

}
