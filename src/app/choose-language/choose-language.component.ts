import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { NgIf } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Component, EventEmitter, Output } from '@angular/core';
import { LocalStorageService } from '../shared/utils';

@Component({
  selector: 'app-choose-language',
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule, MatSelectModule, NgIf, MatMenuModule, ReactiveFormsModule, FormsModule],
  templateUrl: './choose-language.component.html',
  styleUrls: ['./choose-language.component.scss'] // corrected styleUrl to styleUrls
})
export class ChooseLanguageComponent {
  language: any = new FormControl('', Validators.required);

  @Output() languageSelected = new EventEmitter<string>(); // EventEmitter for selected language

  constructor(private ls: LocalStorageService, private dialog: MatDialogRef<ChooseLanguageComponent>) {}

  ngOnInit() {
    console.log("Hello There Choose Language");
  }

  submit() {
    this.ls.saveData('language', this.language.value);
    this.languageSelected.emit(this.language.value); // Emit selected language
    this.close();
  }

  close() {
    this.dialog.close();
  }
}
