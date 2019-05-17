import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private router: Router
    ) { }

  ngOnInit() {
  }

  login(user: string, pass: string) {
    this.auth.login(user, pass)
      .then(() => {
        this.router.navigate(['/principal', {outlets: {principal: 'cadastro/servidor'}}]);
      })
      .catch(erro => {
        console.log(erro);
      });
  }

}
