import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewBookComponent } from './new-book/new-book.component';

const routes: Routes = [
  { path: 'new-book', component: NewBookComponent },
  { path: '', redirectTo: '/', pathMatch: 'full' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
