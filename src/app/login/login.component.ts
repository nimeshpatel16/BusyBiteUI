import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateService } from '../services/Authenticate/authenticate.service';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    public usersForm: FormGroup;
    constructor(private router: Router,
        private authenticateService: AuthenticateService, private fb: FormBuilder) {

    }

    ngOnInit() {
        this.usersForm = this.fb.group({
            userNameInput: new FormControl(),
            PasswordInput: new FormControl()
        });
    }

    onLogin() {
        const username = this.usersForm.value.userNameInput;
        const password = this.usersForm.value.PasswordInput;
        this.authenticateService.Authenticate(username, password).subscribe(data => {
            localStorage.setItem('isLoggedin', 'true');
            localStorage.setItem('UserInfo',  JSON.stringify(data));
            this.router.navigate(['/dashboard']);
        });

    }
}
