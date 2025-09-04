import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DebtService } from '../../../core/services/debt/debt.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-debt-detail',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './debt-detail.component.html',
  styleUrl: './debt-detail.component.scss'
})
export class DebtDetailComponent implements OnInit {

  debt: any;

  private _debtService = inject(DebtService);
  private dialogRef = inject(MatDialogRef<DebtDetailComponent>);
  public data = inject(MAT_DIALOG_DATA);

  ngOnInit(): void {
    this.getData(this.data.id);
  }

  getData(id: number) {
    this._debtService.getDebtById(id).subscribe({
      next: (data: any) => {
        this.debt = data;
      }
    });
  }

  close() {
    this.dialogRef.close();
  }

}
