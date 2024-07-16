import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartComponent } from './pages/start/start.component';
import { GuideComponent } from './pages/guide/guide.component';
import { CategoryComponent } from './pages/category/category.component';
import { SinglecategoryComponent } from './pages/singlecategory/singlecategory.component';

@NgModule({
  declarations: [
    AppComponent,
    StartComponent,
    GuideComponent,
    CategoryComponent,
    SinglecategoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
