import { Component, ViewChild  } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sale-history',
  templateUrl: './sale-history.component.html',
  styleUrls: ['./sale-history.component.css']
})
export class SaleHistoryComponent {

  historyData: any;
  data: any[] = [];
  displayedColumns: string[] = ['name', 'last_name', 'orders', 'price', 'date'];

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
    this.userService.getSaleData().subscribe(
      (response) => {
      console.log(response)
      this.dataSource.data = response;
    });
  }
}
