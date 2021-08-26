import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { TasksService } from 'src/app/tasks.service';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {

  public lists: any;
  public tasks: any;

  constructor(private tasksService: TasksService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.params.subscribe((params: Params) => {
      this.tasksService.getTasks(params.listId).subscribe((tasks: any) => {
        this.tasks = tasks;
      })
    })

    this.tasksService.getLists().subscribe((lists: any) => {
      this.lists = lists;
    })
  }

}
