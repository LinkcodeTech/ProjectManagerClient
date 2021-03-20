import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector:'app-add-project',
  templateUrl:'./add-project.component.html',
  styleUrls: ['./add-project.component.scss']
})

export class AddProjectComponent implements OnInit {
  addProjectForm: FormGroup;
  disabled = false;
  ShowFilter = false;
  limitSelection = false;
   cities:Array<any>= [];
   selectedItems:Array<any>= [];
   dropdownSettings:IDropdownSettings = {};

  constructor(
    private readonly fb: FormBuilder
  ) {
    this.addProjectForm = this.buildAddProjectForm();
    console.log('this.addProjectForm', this.addProjectForm);
  }

  ngOnInit(): void {
    this.getDropdownData();
    this.addProjectForm = this.buildAddProjectForm();
  }
  private buildAddProjectForm(): FormGroup {
    return this.fb.group({
      projectName: [null, [Validators.required]],
      ProjectManager: [null],
      city: [this.selectedItems]
    });
  }

  private getDropdownData() {
    this.cities = [
      { item_id: 1, item_text: 'New Delhi' },
      { item_id: 2, item_text: 'Mumbai' },
      { item_id: 3, item_text: 'Bangalore' },
      { item_id: 4, item_text: 'Pune' },
      { item_id: 5, item_text: 'Chennai' },
      { item_id: 6, item_text: 'Navsari' }
    ];
    this.selectedItems = [{ item_id: 4, item_text: 'Pune' }, { item_id: 6, item_text: 'Navsari' }];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: this.ShowFilter
    };
  }
  onItemSelect(item: any) {
    console.log('onItemSelect', item);
  }
  onSelectAll(items: any) {
    console.log('onSelectAll', items);
  }
  toogleShowFilter() {
    this.ShowFilter = !this.ShowFilter;
    this.dropdownSettings = Object.assign({}, this.dropdownSettings, { allowSearchFilter: this.ShowFilter });
  }

  handleLimitSelection() {
    if (this.limitSelection) {
      this.dropdownSettings = Object.assign({}, this.dropdownSettings, { limitSelection: 2 });
    } else {
      this.dropdownSettings = Object.assign({}, this.dropdownSettings, { limitSelection: null });
    }
  }

}


