import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { DebtService } from '../../core/services/debt/debt.service';
import { DebtDetailComponent } from './debt-detail/debt-detail.component';
import { DebtFormComponent } from './debt-form/debt-form.component';

@Component({
  selector: 'app-debt',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatIconModule,
    MatMenuModule
  ],
  templateUrl: './debt.component.html',
  styleUrl: './debt.component.scss'
})
export class DebtComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'description', 'actions'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  selectedFilter: 'all' | 'completed' | 'pending' = 'all';

  private _debtService = inject(DebtService);
  private _dialog = inject(MatDialog);

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this._debtService.getDebts(this.selectedFilter).subscribe({
      next: (data: any[]) => {
        this.dataSource.data = data;
      }
    });
  }

  onFilterChange(filter: 'all' | 'completed' | 'pending') {
    this.selectedFilter = filter;
    this.getData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  addDebt() {
    const dialogRef = this._dialog.open(DebtFormComponent, {
      width: '400px',
      data: { action: 'add' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getData();
      }
    });
  }

  editDebt(debt: any) {
    const dialogRef = this._dialog.open(DebtFormComponent, {
      width: '400px',
      data: { action: 'edit', data: debt }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getData();
      }
    });
  }

  updateStatusDebt(debt: any) {
    this._debtService.updateStatusDebt(debt.id).subscribe({
      next: () => {
        Swal.fire('Deudas', 'Se actualizó el estado de la deuda', 'success');
        this.getData();
      }
    });
  }
}
