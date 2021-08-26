import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewListComponent } from './pages/new-list/new-list.component';
import { TaskViewComponent } from './pages/task-view/task-view.component';
import { NewTaskComponent } from './pages/new-task/new-task.component';

const routes: Routes = [
  //create ruote
  { path: '', redirectTo: 'lists', pathMatch: 'full'},
  { path: 'new-list', component: NewListComponent},
  { path: 'new-task', component: NewTaskComponent},
  { path: 'lists/:listId', component: TaskViewComponent},
  { path: 'lists', component: TaskViewComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
