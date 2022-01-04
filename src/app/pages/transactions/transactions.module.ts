import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { TransactionsRoutes } from './transactions.routing';
import { TransactionsListComponent } from './views';

@NgModule({
  declarations: [TransactionsListComponent],
  imports: [RouterModule.forChild(TransactionsRoutes), SharedModule],
})
export class TransactionsModule {}
