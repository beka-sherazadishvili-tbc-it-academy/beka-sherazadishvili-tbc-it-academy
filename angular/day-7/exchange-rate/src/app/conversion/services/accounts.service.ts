import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAccounts } from '../models/accounts.model';
import { environment } from '../environment/environment';
import { Observable } from 'rxjs';
import { IRates } from '../models/rates.model';

@Injectable({ providedIn: 'root' })
export class AccountsService {
  constructor(private http: HttpClient) {}

  public getReceiverAccounts(): Observable<IAccounts[]> {
    return this.http.get<IAccounts[]>(
      `${environment.apiReceiversUrl}/receiverAccounts`
    );
  }

  public getSenderAccounts(): Observable<IAccounts[]> {
    return this.http.get<IAccounts[]>(
      `${environment.apiSendersUrl}/senderAccounts`
    );
  }

  public getRates(): Observable<IRates[]> {
    return this.http.get<IRates[]>(`${environment.apiRatesUrl}/rates`);
  }

  public updateSenderAccount(account: IAccounts): Observable<IAccounts> {
    return this.http.put<IAccounts>(
      `${environment.apiSendersUrl}/senderAccounts/${account.id}`,
      account
    );
  }

  public updateReceiverAccount(account: IAccounts): Observable<IAccounts> {
    return this.http.put<IAccounts>(
      `${environment.apiReceiversUrl}/receiverAccounts/${account.id}`,
      account
    );
  }
}
