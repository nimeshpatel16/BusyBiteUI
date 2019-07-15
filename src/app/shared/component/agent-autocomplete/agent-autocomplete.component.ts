import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Agent } from 'src/app/models/agent/agent.model';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AgentService } from 'src/app/services/agent/agent.service';
import { debounceTime, tap, switchMap, finalize } from 'rxjs/operators';
import { empty, of } from 'rxjs';
@Component({
  selector: 'app-agent-autocomplete',
  templateUrl: './agent-autocomplete.component.html',
  styleUrls: ['./agent-autocomplete.component.scss']
})
export class AgentAutocompleteComponent implements OnInit {

  filteredUsers: Agent[] = [];
  public usersForm: FormGroup;
  isLoading = false;
  forbiddenNames = '';
  IsValidProviderSelected = true;
  userInput = new FormControl();
  titleAlert = '';
  titleAlertValidProviderSelected = '';
  public isProviderRequired = false;
  @ViewChild('providerAuto') nameField: ElementRef;
  constructor(private fb: FormBuilder, private agentService: AgentService) { }
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
                      return this.agentService.getAgentName({ firstName: value })
                          .pipe(
                              finalize(() => this.isLoading = false),
                          );
                  } else {
                      this.isLoading = true;
                      debounceTime(1600);

                      // return of({});
                      return this.agentService.getFakeAgentName({ firstName: value })
                          .pipe(
                              finalize(() => this.isLoading = false),
                          );

                  }

              }
              )
          )
          .subscribe(result => {
              this.filteredUsers = result as Agent[];

          });

      if (this.IsValidProviderSelected === false) {

      }

  }

  displayFn(user: Agent) {
      if (user) { return user.agentName; }
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

