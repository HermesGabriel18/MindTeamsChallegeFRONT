import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { ProjectDetailComponent, ProjectFormComponent } from './components';
import { ProjectsRoutes } from './projects.routing';
import { ProjectsListComponent } from './views';

@NgModule({
  declarations: [
    ProjectsListComponent,
    ProjectDetailComponent,
    ProjectFormComponent,
  ],
  imports: [RouterModule.forChild(ProjectsRoutes), SharedModule],
})
export class ProjectsModule {}
