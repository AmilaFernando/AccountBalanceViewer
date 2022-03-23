import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';
import { AccountsSummary } from '../shared/AccountsSummary';

@Component({
  selector: 'app-account-balances',
  templateUrl: './account-balances.component.html',
  styleUrls: ['./account-balances.component.css']
})
export class AccountBalancesComponent implements OnInit {

  accountBalances: AccountsSummary = new AccountsSummary;
  currentYear!: number;
  currentMonth!: String;
  date: Date = new Date();

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.currentMonth = this.date.toLocaleString('en-us', { month: 'long' });
    this.currentYear = this.date.getFullYear();

    this.accountService.getCurrentAccountBalance().subscribe((data: AccountsSummary) => {
      this.accountBalances = data;
    });
    
  }

}
