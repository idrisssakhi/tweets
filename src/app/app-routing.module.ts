import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TwitterComponent } from './twitter/twitter.component';

const routes: Routes = [
  {
    path: 'tweets',
    component: TwitterComponent
  },
  {path: '**',   redirectTo: 'tweets', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
