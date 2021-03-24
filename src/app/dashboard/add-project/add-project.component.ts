import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss']
})

export class AddProjectComponent implements OnInit {
  addProjectForm: FormGroup;
  disabled = false;
  ShowFilter = false;
  limitSelection = false;
  developers: Array<any> = [];
  selectedItems: Array<any> = [];
  dropdownSettings: IDropdownSettings = {};

  isLoading:boolean=false;
  ProjectManagers: Array<any> = [];
  constructor(
    private readonly fb: FormBuilder,
    private authService:AuthService
  ) {
    //this.addProjectForm = this.buildAddProjectForm();
    //console.log('this.addProjectForm', this.addProjectForm);
  }

  ngOnInit(): void {
    this.getDropdownData();
    this.addProjectForm = this.buildAddProjectForm();
  }
  private buildAddProjectForm(): FormGroup {
    return this.fb.group({
      projectName: [null, [Validators.required]],
      ProjectManager: [null],
      developer: [this.selectedItems]
    });
  }

  private getDropdownData() {
    // this.developers = [
    //   { item_id: 1, item_text: 'New Delhi' },
    //   { item_id: 2, item_text: 'Mumbai' },
    //   { item_id: 3, item_text: 'Bangalore' },
    //   { item_id: 4, item_text: 'Pune' },
    //   { item_id: 5, item_text: 'Chennai' },
    //   { item_id: 6, item_text: 'Navsari' }
    // ];
    this.getData();
    this.selectedItems = [];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
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
    console.log(this.addProjectForm.value);
  }

  getData(){
    this.isLoading=true;
    this.authService.getAllDevelopers().subscribe((response:any)=>{
      for(let i=0;i<response.length;++i)
      {
        this.developers.push({item_id:i+1, item_text:response[i].email});
      }
    });

    this.authService.getAllProjectManagers().subscribe((response:any)=>{
      for(let i=0;i<response.length;++i)
      {
        this.ProjectManagers.push(response[i].email);
      }
      this.isLoading=false;
    });
  }
}


