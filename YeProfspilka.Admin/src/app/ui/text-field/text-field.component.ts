import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';

@Component({
	selector: 'app-text-field',
	templateUrl: './text-field.component.html',
})
export class TextFieldComponent implements OnInit {
	@Input() type: string = 'text';
	@Input() classStyles: string = '';
	@Input() placeholder: string = '';
	@Input() value: string = '';
	@Input() defaultValue: string = '';
	@Input() controllName: string | null = null;
	@Output() valueChange = new EventEmitter<string>();

	form: FormGroup | null = null;

	constructor(private formGroupDirective: FormGroupDirective) {}

	ngOnInit(): void {
		if (this.controllName) {
			this.form = this.formGroupDirective?.control;
		}
	}
}
