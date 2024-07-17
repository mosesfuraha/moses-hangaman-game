import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartComponent } from './pages/start/start.component';
import { GuideComponent } from './pages/guide/guide.component';
import { CategoryComponent } from './pages/category/category.component';
import { SinglecategoryComponent } from './pages/singlecategory/singlecategory.component';
import { WinComponent } from './components/win/win.component';

const routes: Routes = [
  { path: '', redirectTo: 'start', pathMatch: 'full' },
  { path: 'start', component: StartComponent },
  { path: 'guide', component: GuideComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'category/:category', component: SinglecategoryComponent },
  { path: 'win', component: WinComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
