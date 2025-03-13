import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


export interface EventFormData {
  name: string
  description: string
  capacity: number
  status: "active" | "canceled" | "finished"
  date: Date
}

@Component({
  selector: "app-event-form",
  templateUrl: "./event-form.component.html",
  styleUrls: ["./event-form.component.css"],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
})

export class EventFormComponent implements OnInit {
  @Output() formSubmitted = new EventEmitter<EventFormData>();
  formulario!: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.formulario = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      capacity: [null, [Validators.required, Validators.min(1)]],
      date: ['', Validators.required],
      status: ['', Validators.required]
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
    
    this.formSubmitted.emit(this.formulario.value as EventFormData)
    this.submitted = false;
    this.formulario.reset();
  }
}