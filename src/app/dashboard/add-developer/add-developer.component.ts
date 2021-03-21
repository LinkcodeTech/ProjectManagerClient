import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-add-developer',
  templateUrl: './add-developer.component.html',
  styleUrls: ['./add-developer.component.scss']
})
export class AddDeveloperComponent implements OnInit {

  addDeveloperForm: FormGroup;
  disabled = false;
  ShowFilter = false;
  limitSelection = false;
  skills: Array<any> = [];
  selectedItems: Array<any> = [];
  dropdownSettings: IDropdownSettings = {};



  constructor(
    private readonly fb: FormBuilder
  ) {
    //this.addDeveloperForm = this.buildAddDeveloperForm();
    //console.log('this.addProjectForm', this.addProjectForm);
  }

  ngOnInit(): void {
    this.getDropdownData();
    this.addDeveloperForm = this.buildAddDeveloperForm();
  }

  private buildAddDeveloperForm(): FormGroup {
    return this.fb.group({
      firstName: [null, [Validators.required]],
      lastName: [null],
      email:[null],
      skills: [this.selectedItems]
    });
  }


  private getDropdownData() {
    this.skills = [
      { skill_id: 1, skill_data: 'New Delhi' },
      { skill_id: 2, skill_data: 'Mumbai' },
      { skill_id: 3, skill_data: 'Bangalore' },
      { skill_id: 4, skill_data: 'Pune' },
      { skill_id: 5, skill_data: 'Chennai' },
      { skill_id: 6, skill_data: 'Navsari' }
    ];
    this.selectedItems = [{ skill_id: 4, skill_data: 'Pune' }, { skill_id: 3, skill_data: 'Bangalore' }];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'skill_id',
      textField: 'skill_data',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 5,
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



  onAddClick(){
    console.log("this.addDeveloperform.value",this.addDeveloperForm.value);
  }

}
