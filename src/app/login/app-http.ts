import { HttpClient, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class AppHttp extends HttpClient {

  constructor(
    private auth: AuthService,
    http: HttpHandler
  ) {
    super(http);
  }

  public delete(url: string, body: any, options?: any): any {
    return this.fazerRequisicao(() => super.delete(url, options));
  }

  public patch(url: string, body: any, options?: any): any {
    return this.fazerRequisicao(() => super.patch(url, options));
  }

  public head(url: string, body: any, options?: any): any {
    return this.fazerRequisicao(() => super.head(url, options));
  }

  public options(url: string, body: any, options?: any): any {
    return this.fazerRequisicao(() => super.options(url, options));
  }

  public get(url: string, body: any, options?: any): any {
    return this.fazerRequisicao(() => super.get(url, options));
  }

  public post(url: string, body: any, options?: any): any {
    return this.fazerRequisicao(() => super.post(url, body, options));
  }

  public put(url: string, body: any, options?: any): any {
    return this.fazerRequisicao(() => super.put(url, body, options));
  }

  private fazerRequisicao(fn: Function): Observable<Response> {
    if (this.auth.isAccessTokenInvalido()) {
        const chamadaNovoAccessToken = this.auth.renovarToken()
        .then(() => {
          return fn().toPromise();
        });

      return Observable.create(chamadaNovoAccessToken);
    } else {
      return fn();
    }
  }

}