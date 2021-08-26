import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TasksService } from 'src/app/tasks.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {

  constructor(
    private taskService: TasksService,
    private route: ActivatedRoute,
    private router: Router,
    ) { }

    public listId: String;

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.listId = params['listId']
    })
  }

  createTask(title: String){
    this.taskService.createTask(title, this.listId).subscribe((newTask) => {
      this.router.navigate(['../'], { relativeTo: this.route});
    })
  }
}
