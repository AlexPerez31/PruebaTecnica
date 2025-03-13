import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

export interface UserFormData {
  name: string
  role: "attendee" | "organizer"
  email: string
}

@Component({
  selector: "app-user-form",
  templateUrl: "./user-form.component.html",
  styleUrls: ["./user-form.component.css"],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
})
export class UserFormComponent implements OnInit {
  @Output() formSubmitted = new EventEmitter<UserFormData>();
  formulario!: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.formulario = this.formBuilder.group({
      name: ['', Validators.required],
      role: ['', Validators.required],
      email: ['', Validators.required],
    });
  }

  get f() {
    return this.formulario.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.formulario.invalid) {
      return;
    }
    
    this.formSubmitted.emit(this.formulario.value as UserFormData)
    this.submitted = false;
    this.formulario.reset();
  }
}

