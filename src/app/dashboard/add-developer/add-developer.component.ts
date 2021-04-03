import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { AuthService } from 'src/app/services/auth/auth.service';

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

  addedskillset:string[]=[];
  private readonly active: ActivatedRoute


  constructor(
    private readonly fb: FormBuilder,
    private authService:AuthService,
    private router:Router
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
      skills: [this.selectedItems,[Validators.required]]
    });
  }


  private getDropdownData() {
    this.skills = [
      { skill_id: 1, skill_data: 'Angular' },
      { skill_id: 2, skill_data: 'NodeJs' },
      { skill_id: 3, skill_data: 'Express' },
      { skill_id: 4, skill_data: 'Nest.js' },
      { skill_id: 5, skill_data: 'Java' },
      { skill_id: 6, skill_data: 'git/github' }
    ];
    this.selectedItems = [];
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
    this.selectedItems.push(item);
    //console.log('onItemSelect', item);
  }
  onSelectAll(items: any) {
    this.selectedItems.splice(0,this.selectedItems.length);
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


  validate():void{

  }


  onAddClick(){
    this.validate();
    //console.log('this.selecteditems',this.selectedItems);
    if(this.addDeveloperForm.valid)
    {
      this.addDeveloper();
    }
  }

  addDeveloper(){
    for(let i=0;i<this.selectedItems.length;++i)
    {
      this.addedskillset.push(this.selectedItems[i].skill_data);
    }
    const reqBody={
      firstName: this.addDeveloperForm.get('firstName').value,
      lastName: this.addDeveloperForm.get('lastName').value,
      email: this.addDeveloperForm.get('email').value,
      skills: this.addedskillset,
      role: 'DEV',
      password: this.addDeveloperForm.get('firstName').value + '@PM' + this.addDeveloperForm.get('lastName').value
    }
    //console.log('Addedskillset',this.addedskillset);

    this.authService.addDeveloper(reqBody).subscribe((response)=>{
      console.log('response',response);
      this.router.navigate(['dashboard/developer-details']);
    });


  }


}
