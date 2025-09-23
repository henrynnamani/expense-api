import { Module } from '@nestjs/common';
import { ExpenseController } from './expense.controller';
import { ExpenseService } from './providers/expense.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Expense } from './model/expense.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Expense])],
  controllers: [ExpenseController],
  providers: [ExpenseService]
})
export class ExpenseModule {}
