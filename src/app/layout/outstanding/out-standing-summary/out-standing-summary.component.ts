import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort, MatSortable, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { merge, Observable, of as observableOf, identity } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { strict } from 'assert';
import { Ouststanding } from 'src/app/models/Ouststanding/ouststanding.model';
import { OutStandingService } from 'src/app/services/OutStanding/out-standing.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { RequestOutStandingSummary } from 'src/app/models/Ouststanding/request-out-standing-summary.model';
import { PartyAutocompleteComponent } from 'src/app/shared/component/party-autocomplete/party-autocomplete.component';
import { CompanyAutocompleteComponent } from 'src/app/shared/component/company-autocomplete/company-autocomplete.component';
import { AgentAutocompleteComponent } from 'src/app/shared/component/agent-autocomplete/agent-autocomplete.component';
import { OutStandingSummary } from 'src/app/models/Ouststanding/out-standing-summary.model';

@Component({
  selector: 'app-out-standing-summary',
  templateUrl: './out-standing-summary.component.html',
  styleUrls: ['./out-standing-summary.component.scss']
})
export class OutStandingSummaryComponent implements OnInit, AfterViewInit {
  OutStandingSummaryForm: FormGroup;
  OutStandingServiceDatabase: OutStandingService | null;
  FinYearServiceObject: OutStandingService | null;
  resultsLength = 0;
  fromDate:Date;
  toDate:Date;
  isLoadingResults = true;
  isRateLimitReached = false;
  data: OutStandingSummary[] = [];
  model: RequestOutStandingSummary;
  finYearmodel: any;
  constructor(private fb: FormBuilder, public router: Router,
    private http: HttpClient, private outStandingService: OutStandingService) {
    this.OutStandingSummaryForm = this.createFormGroup();
    localStorage.removeItem('EditParams');
  }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(PartyAutocompleteComponent) selectedParty: PartyAutocompleteComponent;
  @ViewChild(CompanyAutocompleteComponent) selectedCompany: CompanyAutocompleteComponent;
  @ViewChild(AgentAutocompleteComponent) selectedAgent: AgentAutocompleteComponent;

  displayedColumns = ['partyname', 'BillAmount', 'PaidAmount', 'Balance', 'partyId'];
  dataSource: OutStandingSummary[] = [];
  public Search = () => { this.LoadGrid(); };
  public clearSearch = () => { this.ClearSearch();};
  isEmpty(value) {
    return value == null || value === '';
  }
  public redirectToUpdate = (companyId: number, partyId: number, agentId: number) => {
    const myObj = {

      companyId: this.selectedCompany.userInput.value == null
      ? -1
      : this.selectedCompany.usersForm.get('userInput').value.CompanyId,
      partyId: partyId,

      agentId: this.selectedAgent.userInput.value == null ? -1 : 
       this.selectedAgent.usersForm.get('userInput').value.AgentId,

      //startDate: this.OutStandingSummaryForm.value.startDate,
      //endDate: this.OutStandingSummaryForm.value.endDate

      startDate : this.OutStandingSummaryForm.value.startDate==null ? this.fromDate:
      this.OutStandingSummaryForm.value.startDate,

      endDate : this.OutStandingSummaryForm.value.endDate ==null ? this.toDate :
      this.OutStandingSummaryForm.value.endDate

    };

    localStorage.setItem('EditParams', JSON.stringify(myObj));
    this.router.navigate(['/outstanding/Out-Standing-Details']);
  }
  public redirectToDetail = () => {
    this.router.navigate(['/outstanding/Out-Standing-Details']);
  }
  public CalltoDelete = (id: string) => {
    // this.chartreviewService.DeleteChartAudit(Number(id)).subscribe(res => {
    //   this.openAlertDialog('Record Deleted sucessfully.');
    // });
  }
  createFormGroup() {
    return new FormGroup({
      startDate: new FormControl(),
      endDate: new FormControl(),
    });
  }
  BindGrid() {
    //this.GetFinYear();
    //this.GetFinYear();
    this.LoadGrid();
  }

 ClearSearch(){
   this.selectedCompany.userInput.setValue('');
   this.selectedParty.userInput.setValue('');
   this.selectedAgent.userInput.setValue('');
  // this.OutStandingSummaryForm.setValue='';
   //this.OutStandingSummaryForm.value.startDate=undefined;
   //this.OutStandingSummaryForm.value.endDate=undefined;
   this.LoadGrid();
   }

  //  GetFinYear():{
  //    debugger;
     
  //  // this.FinYearServiceObject = new OutStandingService(this.http);
  //   //this.finYearmodel=new FinancialYear();
  //     this.outStandingService.GetFinancialYear();
  //     //this.finYearmodel.startDate=data[0].startDate;
  //     //this.finYearmodel.endDate=data[0].endDate;
    
  //   // this.authenticateService.Authenticate(username, password).subscribe(data => {
  //   //   localStorage.setItem('isLoggedin', 'true');
  //   //   localStorage.setItem('UserInfo',  JSON.stringify(data));
  //   //   this.router.navigate(['/dashboard']);
  //  }

  LoadGrid() {
    this.OutStandingServiceDatabase = new OutStandingService(this.http);
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;

          this.model = new RequestOutStandingSummary();
          this.model.PageIndex = this.paginator.pageIndex === 0 ? 1 : this.paginator.pageIndex + 1;
          this.model.PageSize = this.paginator.pageSize;
          this.model.SortDirection = this.sort.direction;
          this.model.SortbyColumn = this.sort.active;
          this.model.date1 = this.OutStandingSummaryForm.value.startDate==null ?   new Date("1980/09/16") :
          this.OutStandingSummaryForm.value.startDate;

          this.model.date2 = this.OutStandingSummaryForm.value.endDate ==null ? new Date("1980/09/16") :
          this.OutStandingSummaryForm.value.endDate;

          this.model.companyId = this.selectedCompany.userInput.value == null
            ? -1
            : this.selectedCompany.usersForm.get('userInput').value.CompanyId;
          this.model.partyId = this.selectedParty.userInput.value == null
            ? -1
            : this.selectedParty.usersForm.get('userInput').value.PartyId;
          this.model.agentId = this.selectedAgent.userInput.value == null
            ? -1
            : this.selectedAgent.usersForm.get('userInput').value.AgentId;
          
          return this.outStandingService.LoadData(this.model);
        }),
        map(data => {
          
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = data[0].TotalRowCount;
          this.fromDate = data[0].startDate;
          this.toDate = data[0].endDate;

          return data;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          // Catch if the GitHub API has reached its rate limit. Return empty data.
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      )
      .subscribe(data => {
        this.dataSource = data;
       });
  }
  ngAfterViewInit(): void {
    this.BindGrid();
  }
  ngOnInit() {
    this.sort.sort(<MatSortable>{
      id: 'partyId',
      start: 'desc'
    }
    );
  }
}
