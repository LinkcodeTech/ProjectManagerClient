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
  developers: Array<any> = [];
  selectedItems: Array<any> = [];
  dropdownSettings: IDropdownSettings = {};

  isLoading:boolean=false;
  ProjectManagers: Array<any> = [];
  addedDevelopers:string[]=[];
  constructor(
    private readonly fb: FormBuilder,
    private authService:AuthService,
    private router:Router
  ) {
    //this.addProjectForm = this.buildAddProjectForm();
    //console.log('this.addProjectForm', this.addProjectForm);
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
    //   { item_id: 2, item_text: 'Mumbai' },
    //   { item_id: 3, item_text: 'Bangalore' },
    //   { item_id: 4, item_text: 'Pune' },
    //   { item_id: 5, item_text: 'Chennai' },
    //   { item_id: 6, item_text: 'Navsari' }
    // ];
    this.getDeveloperData();
    this.getPMData();
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
    this.selectedItems.push(item);
    //console.log('onItemSelect', item);
  }

  onSelectAll(items: any) {
    for(let i=0;i<items.length;++i)
    {
      this.selectedItems.push(items[i]);
    }
    //console.log('onSelectAll', items);
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

  validate(){

  }

  onAddClick(){
    //console.log(this.addProjectForm.value);
    this.validate();
    //console.log('this.selecteditems',this.selectedItems);
    if(this.addProjectForm.valid)
    {
      this.addProject();
    }
  }


  getDeveloperData(){
    this.isLoading=true;
    this.authService.getAllDevelopers().subscribe((response:any)=>{
      for(let i=0;i<response.length;++i)
      {
        this.developers.push({item_id:i+1, item_text:response[i].email});
      }
    });
    //console.log('developers',this.developers)

  }
  getPMData(){
    this.authService.getAllProjectManagers().subscribe((response:any)=>{
      for(let i=0;i<response.length;++i)
      {
        this.ProjectManagers.push(response[i].email);
      }
      this.isLoading=false;
    });
  }

  addProject(){

    for(let i=0;i<this.selectedItems.length;++i)
    {
      this.addedDevelopers.push(this.selectedItems[i].item_text);
    }
    const reqBody={
      name: this.addProjectForm.get('projectName').value,
      projectManager: this.addProjectForm.get('projectManager').value,
      developers: this.addedDevelopers
    }
    console.log('addedDevelopers',this.addedDevelopers);
    console.log('manager',this.addProjectForm.get('projectManager').value);


    this.authService.addProject(reqBody).subscribe((response)=>{
      console.log('response',response);
    });

    this.router.navigate(['dashboard/project']);

  }

}


