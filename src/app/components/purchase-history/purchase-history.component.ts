import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-purchase-history',
  templateUrl: './purchase-history.component.html',
  styleUrls: ['./purchase-history.component.css']
})
export class PurchaseHistoryComponent {

  historyData: any;
  data:any[] = [];
  displayedColumns: string[] = ['name', 'empresa', 'date'];

  dataSource = new MatTableDataSource<any>(this.data);
  clickedRows = new Set<any>()

  constructor(private userService: UserService) {
    this.historyData = {};
  }

  @ViewChild(MatPaginator, {static: true})
  paginator!: MatPaginator

  ngOnInit(): void {
    this.getHistory();
    this.dataSource.paginator = this.paginator;
  }

  getHistory(): void {
    this.userService.getPurchaseData().subscribe(
      (response) => {
      console.log(response)
      this.dataSource.data = response.filter((product: any) => product.pay_address !== null);
    });
  }
}
