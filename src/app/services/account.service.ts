import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AccountsSummary } from '../shared/AccountsSummary';
import { ChartAccountDataset } from '../shared/ChartAccountDataset';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  api: string = environment.apiUrl + 'AccountBalance';

  constructor(private httpClient: HttpClient) { }

  getCurrentAccountBalance(): Observable<AccountsSummary> {
    return this.httpClient.get<AccountsSummary>(this.api + '/GetCurrentBalance')
      .pipe(
        catchError(this.errorHandler)
      );
  }

  getChartData(year: number): Observable<ChartAccountDataset> {
    return this.httpClient.get<ChartAccountDataset>(this.api + '/GetChartData/' + year)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  importAccountBalances(file: File, month: number, year: number): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('formFile', file);
    formData.append('Month', month.toString());
    formData.append('Year', year.toString());
    const req = new HttpRequest('POST', `${this.api}/ImportBalances`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.httpClient.request(req);
  }


  errorHandler(error:any) {
    let errorMessage = '';
 
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
