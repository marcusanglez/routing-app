import {Injectable, NgModule} from '@angular/core';
import {
  provideRouter,
  ResolveFn,
  RouterModule, RouterStateSnapshot,
  Routes,
  TitleStrategy,
  withComponentInputBinding
} from '@angular/router';

import {Title} from "@angular/platform-browser";
import { NavigationExtras} from "@angular/router";

import { FirstComponent } from "./first/first.component";
import { SecondComponent } from "./second/second.component";
import { ChildAComponent} from "./child-a/child-a.component";
import { ChildBComponent} from "./child-b/child-b.component";


const resolvedChildATitle: ResolveFn<string> = () => Promise.resolve('child a');

const routes: Routes = [
  {path:'first', title: 'First', component:FirstComponent,
    // these are the elements with <router-outlet> in the template
    children: [
      {path: 'child-a', title: resolvedChildATitle, component: ChildAComponent},
      {path: 'child-b', component: ChildBComponent}
    ]

  },
  {path:'second', component:SecondComponent},
  {path:'', redirectTo:'/first', pathMatch: 'full'}
  //{path: '**', component: PageNotFoundComponent}
];

@Injectable({providedIn: 'root'})
export class TemplatePageTitleStrategy extends TitleStrategy {
  constructor(private readonly title: Title) {
    super();
  }

  override updateTitle(routerState: RouterStateSnapshot) {
    const title = this.buildTitle(routerState);
    if (title !== undefined) {
      this.title.setTitle(`My Application | ${title}`);
    }
  }
}

@NgModule({
  // declarations
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
      provideRouter(routes, withComponentInputBinding()),
      { provide: TitleStrategy, useClass: TemplatePageTitleStrategy},

  ]
})
export class AppRoutingModule { }
