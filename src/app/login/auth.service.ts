import * as jwt_decode from 'jwt-decode';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  oauthTokenUrl = 'http://localhost:4200/api/oauth/token';
  jwtPayload: any;

  constructor(
    private http: HttpClient
    ) { this.carregarToken(); }

  login(usuario: string, senha: string): Promise<void> {

    const options = { headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                      .set('Authorization', 'Basic YWRtaW46YWRtaW4='), withCredentials: true };

    const body = `username=${usuario}&password=${senha}&grant_type=password`;

    return this.http.post(this.oauthTokenUrl, body, options)
      .toPromise()
      .then(response => {
        const responseJSON = JSON.parse(JSON.stringify(response));
        this.armazenarToken(responseJSON.access_token);
      }).catch(response => {
        if (response.status === 400) {
          const responseJSON = JSON.parse(JSON.stringify(response));

          if (responseJSON.error === 'invalid_grant') {
            return Promise.reject('Usuário ou senha inválidos!');
          }
        }

        return Promise.reject(response);
       });
  }

  isAccessTokenInvalido(): boolean {
    const token = localStorage.getItem('token');

    return !token || this.jwtPayload.exp <= new Date().getTime.toString;
  }

  renovarToken(): Promise<void> {
    const options = { headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                      .set('Authorization', 'Basic YWRtaW46YWRtaW4='), withCredentials: true };
    const body = 'grant_type=refresh_token';

    return this.http.post(this.oauthTokenUrl, body, options)
      .toPromise()
      .then(response => {
        const responseJSON = JSON.parse(JSON.stringify(response));
        this.armazenarToken(responseJSON.access_token);
        return Promise.resolve(null);
      })
      .catch(response => {
        console.log(response);
        return Promise.resolve(null);
      });
  }

  private armazenarToken(token: string) {
    this.jwtPayload = jwt_decode(token);
    localStorage.setItem('token', token);
  }

  private carregarToken() {
    const token = localStorage.getItem('token');

    if (token) {
      this.armazenarToken(token);
    }
  }

}
