import { Module } from '@nestjs/common';
import { ExpenseController } from './expense.controller';
import { ExpenseService } from './providers/expense.service';

@Module({
  controllers: [ExpenseController],
  providers: [ExpenseService]
})
export class ExpenseModule {}
