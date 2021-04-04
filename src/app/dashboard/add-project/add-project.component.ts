import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

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
  developers: any[] = [];
  selectedItems: Array<any> = [];
  dropdownSettings: IDropdownSettings = {};

  isLoading = false;
  ProjectManagers: Array<any> = [];
  addedDevelopers: string[] = [];
  constructor(
    private readonly fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.getDropdownData();
  }

  ngOnInit(): void {

    this.addProjectForm = this.buildAddProjectForm();
  }
  private buildAddProjectForm(): FormGroup {
    return this.fb.group({
      projectName: [null, [Validators.required]],
      projectManager: [null],
      developers: [this.selectedItems]
    });
  }

  private getDropdownData() {
    // this.developers = [
    //   { item_id: 1, item_text: 'New Delhi' },
    // ];
    this.getDeveloperData();
    this.getPMData();
    this.selectedItems = [];
    this.dropdownSettings = {
      singleSelection: false,
      idField: '_id',
      textField: 'email',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 5,
      allowSearchFilter: this.ShowFilter
    };
  }

  onItemSelect(item: any) {
    this.selectedItems.push(item);
  }

  onItemDeselect(item: any) {
    const index = this.selectedItems.findIndex((value, i) => value._id === item._id);
    if (index !== -1) {
      this.selectedItems.splice(index, 1);
    }
  }

  onSelectAll(items: any) {
    this.selectedItems.splice(0, this.selectedItems.length);
    items.forEach(item => {
      this.selectedItems.push(item);
    });
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

  validate() {

  }

  onAddClick() {
    this.validate();
    if (this.addProjectForm.valid) {
      this.addProject();
    }
  }


  getDeveloperData() {
    this.isLoading = true;
    this.authService.getAllDevelopers().subscribe((response: any) => {
      this.developers = response;
    });
  }

  getPMData() {
    this.authService.getAllProjectManagers().subscribe((response: any) => {
      response.forEach(element => {
        this.ProjectManagers.push(element.email);
      });
      this.isLoading = false;
    });
  }

  addProject() {

    this.selectedItems.forEach((item) => {
      this.addedDevelopers.push(item._id);
    });
    const reqBody = {
      name: this.addProjectForm.get('projectName').value,
      projectManager: this.addProjectForm.get('projectManager').value,
      developers: this.addedDevelopers
    };

    this.authService.addProject(reqBody).subscribe((response) => {
      this.router.navigate(['dashboard/project']);
    });
  }

}


