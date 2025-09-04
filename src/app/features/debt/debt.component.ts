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
import { CommonModule } from '@angular/common';
import { Debt, DebtSummary } from './../../core/models/debt/debt.model';

@Component({
  selector: 'app-debt',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatIconModule,
    MatMenuModule,
    CommonModule
  ],
  templateUrl: './debt.component.html',
  styleUrl: './debt.component.scss'
})
export class DebtComponent implements OnInit {
  summary!: DebtSummary;
  displayedColumns: string[] = ['id', 'description', 'amount', 'status', 'actions'];
  dataSource: MatTableDataSource<Debt> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  selectedFilter: 'all' | 'completed' | 'pending' = 'all';

  private _debtService = inject(DebtService);
  private _dialog = inject(MatDialog);

  ngOnInit(): void {
    this.getData();
    this.getSummary();
  }

  getData(): void {
    this._debtService.getDebts(this.selectedFilter).subscribe({
      next: (data: Debt[]) => {
        this.dataSource.data = data;
      }
    });
  }

  getSummary(): void {
    this._debtService.getSummary().subscribe({
      next: (summary: DebtSummary) => {
        this.summary = summary;
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
      width: '500px',
      data: { action: 'add' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getData();
        this.getSummary();
      }
    });
  }

  editDebt(debt: Debt) {
    const dialogRef = this._dialog.open(DebtFormComponent, {
      width: '500px',
      data: { action: 'edit', data: debt }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getData();
        this.getSummary();
      }
    });
  }

  updateStatusDebt(debt: Debt) {
    this._debtService.updateStatusDebt(debt.id).subscribe({
      next: () => {
        Swal.fire('Deudas', 'Se marco la deuda como pagada', 'success');
        this.getData();
        this.getSummary();
      }
    });
  }

  viewDetail(debt: Debt) {
    const dialogRef = this._dialog.open(DebtDetailComponent, {
      width: '500px',
      data: debt
    });
  }

  deleteDebt(debt: Debt) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this._debtService.deleteDebt(debt.id).subscribe({
          next: () => {
            Swal.fire('Deudas', 'Se eliminó la deuda correctamente', 'success');
            this.getData();
            this.getSummary();
          }
        });
      }
    });
  }

  exportToJSON(): void {
    this._debtService.exportDebts('json').subscribe({
      next: (data) => {
        const filename = `deudas.json`;
        this.downloadJSON(data, filename);
        Swal.fire('Deudas', 'Deudas exportadas en formato JSON', 'success');
      }
    });
  }

  exportToCSV(): void {
    this._debtService.exportDebts('csv').subscribe({
      next: (data) => {
        const filename = `deudas.csv`;
        this.downloadCSV(data, filename);
        Swal.fire('Deudas', 'Deudas exportadas en formato CSV', 'success');
      }
    });
  }

  private downloadCSV(csvData: string, filename: string) {
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    this.triggerDownload(blob, filename);
  }

  private downloadJSON(jsonData: any, filename: string) {
    const dataStr = typeof jsonData === 'string' ? jsonData : JSON.stringify(jsonData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    this.triggerDownload(blob, filename);
  }

  private triggerDownload(blob: Blob, filename: string) {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}
