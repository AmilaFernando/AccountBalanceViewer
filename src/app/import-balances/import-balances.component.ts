import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-import-balances',
  templateUrl: './import-balances.component.html',
  styleUrls: ['./import-balances.component.css']
})
export class ImportBalancesComponent implements OnInit {

  selectedFile?: File;
  errMessage = '';
  fileInfo?: Observable<any>;
  allowedFileTypes: string[] = ['csv', 'txt'];
  year: number = 0;
  month: number = 0;
  date: Date = new Date();

  constructor(private accountService: AccountService) { }
  
  ngOnInit(): void {
    
    this.month = this.date.getMonth();
    this.year = this.date.getFullYear();
  }

  selectFile(event: any): void {
    var fileName = event.target.files[0].name;
    var extension = fileName.split('.').pop();
    this.selectedFile = undefined;

    if(!this.allowedFileTypes.includes(extension)){
      this.errMessage = "Only csv and txt files are allowed to upload!"
      return;
    }
    this.errMessage = '';
    this.selectedFile = event.target.files[0];
  }

  upload(): void {
    
    if (this.selectedFile) {
      const file: File | null = this.selectedFile;
      if (file) {
        this.accountService.importAccountBalances(file, this.month, this.year).subscribe({
          next: (event: any) => {
            this.selectedFile = undefined;
          },
          error: (err: any) => {
            if (err.error && err.error.message) {
              this.errMessage = err.error.message;
            } else {
              this.errMessage = 'Could not upload the file!';
            }
          }
        });
      }
      this.selectedFile = undefined;
    }
  }

}
