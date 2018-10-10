import {Component} from '@angular/core';
import {HTTPTestService} from './http-test.service';
import {ContextMenuModule} from 'primeng/contextmenu';
import {MenuItem} from 'primeng/api';
import {DialogModule} from 'primeng/dialog';
import {InputTextModule} from 'primeng/inputtext';
import { Contact } from './contact';

@Component({
    selector: 'http-test',
    templateUrl: './http-test.component.html',
    providers: [HTTPTestService]
})
export class HTTPTestComponent {

  getPeople: any = [];
  cols: any[];
  selectedContact: any = {};
  items: MenuItem[];
  displayDetailDialog: boolean = false;
  displayAddDialog: boolean = false;
  displayEditDialog: boolean = false;
  inputFirstName: string;
  inputLastName: string;
  inputEmail: string;
  

  constructor (private _httpService: HTTPTestService) {
      
  }

  ngOnInit(){
    this.getContacts();

    this.cols = [
      { field: 'firstName', header: 'Meno' },
      { field: 'lastName', header: 'Priezvisko' }
    ];
  
    this.items = [
      { label: 'Detail', icon: 'pi pi-info', command: (event) => this.showDetailDialog() },
      { label: 'Upravit', icon: 'pi pi-pencil', command: (event) => this.showEditingDialog() },
      { label: 'Pridat', icon: 'pi pi-plus', command: (event) => this.showAddDialog() },
      { label: 'Vymazat', icon: 'pi pi-times', command: (event) => this.deleteContact() }
    ];

  }

  showDetailDialog(){
    this.displayDetailDialog = true;
  }

  showAddDialog(){ 
    this.inputEmail = "";
    this.inputFirstName = "";
    this.inputLastName = "";  
    this.displayAddDialog = true;
  }

  showEditingDialog(){
    this.inputEmail = this.selectedContact.email;
    this.inputFirstName = this.selectedContact.firstName;
    this.inputLastName = this.selectedContact.lastName;
    this.displayEditDialog = true;
  }

  getContacts(){
    this._httpService.getAllPeople()
      .subscribe(
        data => {            
            this.getPeople = data;},
        error => alert(error),
        () => console.log("Finished")
      );
  }

  createContactPost(){
    let newContact =  new Contact();
    newContact.email = this.inputEmail;
    newContact.firstName = this.inputFirstName;
    newContact.lastName = this.inputLastName;
    this._httpService.addContact(newContact).subscribe(contact => {
      newContact.id = contact.id;
      this.getPeople.push(newContact)});
  }

  deleteContact(){
    this._httpService.deleteContact(this.selectedContact.id).subscribe();
    this.getPeople = this.getPeople.filter(x => x.id != this.selectedContact.id);
  }

  updateContact(){
    let updatedContact =  new Contact();
    updatedContact.id = this.selectedContact.id;
    updatedContact.email = this.inputEmail;
    updatedContact.firstName = this.inputFirstName;
    updatedContact.lastName = this.inputLastName;
    this._httpService.updateContact(updatedContact).subscribe(response => {
      //do something with the response
      let index = this.getPeople.map(function(e) {return e.id;}).indexOf(updatedContact.id);
      this.getPeople[index] = updatedContact;
    });
  }


}
