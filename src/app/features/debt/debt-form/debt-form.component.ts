import { Component, inject, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { DebtService } from '../../../core/services/debt/debt.service';
import { Debt } from '../../../core/models/debt/debt.model';

@Component({
  selector: 'app-debt-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './debt-form.component.html',
  styleUrl: './debt-form.component.scss'
})
export class DebtFormComponent implements OnInit {

  debtForm!: FormGroup;

  private fb = inject(FormBuilder);
  private _debtService = inject(DebtService);
  private dialogRef = inject(MatDialogRef<DebtFormComponent>);
  public data = inject(MAT_DIALOG_DATA);

  ngOnInit(): void {
    this.constructorForm();
  }

  constructorForm() {
    this.debtForm = this.fb.group({
      description: [this.data.data ? this.data.data.description : '', Validators.required],
      amount: [this.data.data ? this.data.data.amount : '', [Validators.required, Validators.min(1)]],
    });
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    if (this.debtForm.invalid) return;
    const data = {
      description: this.debtForm.value.description,
      amount: this.debtForm.value.amount,
      paid: false
    }

    if (this.data?.action === 'edit') {
      this._debtService.editDebt(this.data.data.id, data).subscribe({
        next: () => {
          Swal.fire('Deudas', 'Deuda actualizada correctamente', 'success').then(() =>
            this.dialogRef.close(true)
          );
        }
      });
    } else {
      this._debtService.addDebt(data).subscribe({
        next: () => {
          Swal.fire('Deudas', 'Deuda agregada correctamente', 'success').then(() =>
            this.dialogRef.close(true)
          );
        }
      });
    }
  }
}
