import { Component, OnInit } from '@angular/core';
import { Ouststanding } from 'src/app/models/Ouststanding/ouststanding.model';
import { OutStandingDetail } from 'src/app/models/Ouststanding/out-standing-detail.model';
import { RequestOutStandingDetail } from 'src/app/models/Ouststanding/request-out-standing-detail.model';
import { OutStandingService } from 'src/app/services/OutStanding/out-standing.service';

@Component({
  selector: 'app-out-standing-details',
  templateUrl: './out-standing-details.component.html',
  styleUrls: ['./out-standing-details.component.scss']
})
export class OutStandingDetailsComponent implements OnInit {
  model: RequestOutStandingDetail;
  constructor(private outStandingService: OutStandingService) { }
  displayedColumns: string[] = ['BillNo', 'companyName', 'BillDate', 'BillAmount', 'PaidAmount', 'Balance'];
  companyname: string;
  partyname: string;
  agentname: string;
  date1: Date;
  date2: Date;
  public transactions: OutStandingDetail[] = [];
  public getOutStandingDetail = () => {
    let retrievedObject = localStorage.getItem('EditParams');
    retrievedObject = JSON.parse(retrievedObject);
    this.model = new RequestOutStandingDetail();
    this.model.date1 = retrievedObject['startDate'];
    this.model.date2 = retrievedObject['endDate'];
    this.model.companyId = retrievedObject['companyId'];
    this.model.agentId = retrievedObject['agentId'];
    this.model.partyId = retrievedObject['partyId'];
    this.outStandingService.LoadOutStandingDetails(this.model).subscribe(data => {
      
      this.companyname = data[0].companyName;
      this.partyname = data[0].partyName;
      this.agentname = data[0].agentName;
      this.date1 = this.model.date1;
      this.date2 = this.model.date2;
      this.transactions = data;
    });
  }
  /** Gets the total cost of all transactions. */
  getTotalBillAmount() {
    return this.transactions.map(t => t.BillAmount).reduce((acc, value) => acc + value, 0);
  }
  getTotalPaidAmount() {
    return this.transactions.map(t => t.PaidAmount).reduce((acc, value) => acc + value, 0);
  }
  getTotalBalance() {
    return this.transactions.map(t => t.Balance).reduce((acc, value) => acc + value, 0);
  }

  ngOnInit() {
    this.getOutStandingDetail();
  }

}
