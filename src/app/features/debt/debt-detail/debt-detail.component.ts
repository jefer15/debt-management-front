import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DebtService } from '../../../core/services/debt/debt.service';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Debt } from './../../../core/models/debt/debt.model';

@Component({
  selector: 'app-debt-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatDialogModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './debt-detail.component.html',
  styleUrl: './debt-detail.component.scss'
})
export class DebtDetailComponent implements OnInit {

  debt!: Debt;

  private _debtService = inject(DebtService);
  private dialogRef = inject(MatDialogRef<DebtDetailComponent>);
  public data = inject<Debt>(MAT_DIALOG_DATA);

  ngOnInit(): void {
    this.getData(this.data.id);
  }

  getData(id: number): void {
    this._debtService.getDebtById(id).subscribe({
      next: (data: Debt) => {
        this.debt = data;
      }
    });
  }

  close() {
    this.dialogRef.close();
  }

}
