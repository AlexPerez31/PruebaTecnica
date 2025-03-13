import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

export interface SessionFormData {
  title: string
  speaker: string
  start_time: Date
  end_time: Date
}

@Component({
  selector: "app-session-form",
  templateUrl: "./session-form.component.html",
  styleUrls: ["./session-form.component.css"],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
})

export class SessionFormComponent implements OnInit {
  @Output() formSubmitted = new EventEmitter<SessionFormData>();
  formulario!: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.formulario = this.formBuilder.group({
      title: ['', Validators.required],
      speaker: ['', Validators.required],
      start_time: ['', Validators.required],
      end_time: ['', Validators.required],
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
    
    this.formSubmitted.emit(this.formulario.value as SessionFormData)
    this.submitted = false;
    this.formulario.reset();
  }
}

