import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cad-tsk',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './up-tsk.component.html',
  styleUrls: ['./up-tsk.component.scss']
})
export class UpTskComponent {
  isOtherSelected = false;

  colors = [{name:'Default', value:'white'},{name:'Azul acinzentado', value:'#789DBC'},{name:'Rosa claro', value:' #FFE3E3'},{name:'Creme', value:' #FEF9F2'},{name:'Verde pastel', value:'#C9E9D2'}];
  categor: { name: string }[] = [];
  private builder = inject(NonNullableFormBuilder);

  form = this.builder.group({
    name: ['', [Validators.required]],
    discricao: ['', [Validators.required]],
    statuss: ['Afazer'],
    dueDate: ['', [Validators.required]],
    color: ['', [Validators.required]],
    category: ['', [Validators.required]] 
  });

  customCategoryControl = new FormControl('');

  onCategoryChange(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.isOtherSelected = selectedValue === 'outra';

    if (!this.isOtherSelected) {
      this.form.get('category')?.setValue(selectedValue);
    } else {
      this.form.get('category')?.setValue('');
      this.customCategoryControl.setValue('');
    }
  }

  onCustomCategoryInput(event: Event): void {
    const customCategoryValue = (event.target as HTMLInputElement).value;
    this.form.get('category')?.setValue(customCategoryValue);
  }

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value); 
    }
  }
}
