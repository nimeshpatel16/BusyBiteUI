import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Company } from 'src/app/models/company/company.model';
import { CompanyService } from 'src/app/services/company/company.service';
import { debounceTime, tap, switchMap, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-company-autocomplete',
  templateUrl: './company-autocomplete.component.html',
  styleUrls: ['./company-autocomplete.component.scss']
})
export class CompanyAutocompleteComponent implements OnInit {

  filteredUsers: Company[] = [];
  public usersForm: FormGroup;
  isLoading = false;
  forbiddenNames = '';
  IsValidProviderSelected = true;
  userInput = new FormControl();
  titleAlert = '';
  titleAlertValidProviderSelected = '';
  public isProviderRequired = false;
  @ViewChild('providerAuto') nameField: ElementRef;
  constructor(private fb: FormBuilder, private companyService: CompanyService) { }
  IsValidField(): boolean {
      this.usersForm.controls['userInput'].markAsTouched({ 'onlySelf': true });
      this.markFormGroupTouched(this.usersForm);
      return this.usersForm.valid;
  }

  private markFormGroupTouched(formGroup: FormGroup) {
      (<any>Object).values(formGroup.controls).forEach(control => {
          control.markAsTouched();

          if (control.controls) {
              this.markFormGroupTouched(control);
          }
      });
  }

  ngOnInit() {
      // this.isProviderRequired = true;
      if (this.isProviderRequired) {
          this.usersForm = this.fb.group({
              userInput: [null, [Validators.required]]
          });
      } else {
          this.usersForm = this.fb.group({
              userInput: this.userInput
          });

      }



      this.usersForm
          .get('userInput')
          .valueChanges
          .pipe(
              debounceTime(1000),
              tap(() => this.isLoading = true),

              switchMap(value => {
                  // debugger;
                  if (value.length >= 1) {
                      return this.companyService.getCompanyName({ firstName: value })
                          .pipe(
                              finalize(() => this.isLoading = false),
                          );
                  } else {
                      this.isLoading = true;
                      debounceTime(1600);

                      // return of({});
                      return this.companyService.getFakeCompanyName({ firstName: value })
                          .pipe(
                              finalize(() => this.isLoading = false),
                          );

                  }

              }
              )
          )
          .subscribe(result => {
              this.filteredUsers = result as Company[];

          });

      if (this.IsValidProviderSelected === false) {

      }

  }

  displayFn(user: Company) {
      // debugger;
      if (user) { return user.CompanyName; }
  }
public  removeValidators(form: FormGroup) {

      (<any>Object).values(form.controls).forEach(control => {
          control.markAsTouched();

          if (control.controls) {
              this.usersForm.get(control).clearValidators();
              this.usersForm.get(control).updateValueAndValidity();
          }
      });

  }
}

