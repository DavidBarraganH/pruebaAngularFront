import { Component, OnInit, Inject } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { FieldValidator } from '../../field.validator';
import { AccessBankService } from '../../services/access.bank.service';
import { DatePipe } from '@angular/common';

import {  MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';

@Component({
  selector: 'formulario-registro',
  templateUrl: './formulario-registro.component.html',
  styleUrls: ['./formulario-registro.component.scss'],
  providers:[AccessBankService]
})

export class FormularioRegistroComponent implements OnInit {

  public new_client :any;
  public datePipeString : string;
  public isRegistered: boolean;
  public ids = [];

  constructor(
    /* Utilizada para los dialogos */
    private dialog: MatDialog,

    /* Para formatear la fecha de cumpleaños */
    private datePipe: DatePipe,

    /* LLamada a AccessBankService: Servicio de Api   */
    private _requestAccessBankService:  AccessBankService
  ) {

    this.isRegistered = false;
    this.new_client = {
        "birthdate": "",
        "firstname": "",
        "lastname": "",
        "identification": ""
    };
  }

  openAlertDialog(msg) {
    const dialogRef = this.dialog.open(AlertDialogComponent,{
      data:{
        message: msg,
        buttonText: {
          cancel: 'Ok'
        }
      },
    });
  }

  
  ngOnInit(): void {
    
  }

  
  form = new FormGroup({
    birthdate : new FormControl('', Validators.required),
    firstname :  new FormControl('', [Validators.required, Validators.pattern('[a-zA-ZÀ-ÿ ]*'),FieldValidator.noOnlyEmpty]),
    lastname : new FormControl('', [Validators.required, Validators.pattern('[a-zA-ZÀ-ÿ ]*'),FieldValidator.noOnlyEmpty]),
    identification :  new FormControl('', [Validators.required,Validators.min(1),FieldValidator.isNumericValidation])
  });


  get f(){
      return this.form.controls;
  }

  getErrorMessge(field) {
    switch(field){
      case 1: if(this.f.birthdate.hasError('required') || this.f.birthdate.hasError('noOnlyEmpty')){return 'El campo fecha de nacimiento es requerido';};
      break;

      case 2: if(this.f.firstname.hasError('required') || this.f.firstname.hasError('noOnlyEmpty') || this.f.firstname.hasError('pattern')){return 'El campo nombre es requerido, Valores aceptados: (Solo letras, letras con acentos y espacios)';};
      break;

      case 3: if(this.f.lastname.hasError('required') || this.f.lastname.hasError('noOnlyEmpty') || this.f.lastname.hasError('pattern')){return 'El campo apellido es requerido, Valores aceptados: (Solo letras, letras con acentos y espacios)';};
      break;

      case 4: 
      if(this.f.identification.hasError('required') || this.f.identification.hasError('isNumericValidation') || this.f.identification.hasError('min')){
        return 'El campo identificación es requerido, Valores aceptados: (Solo numeros, mayores a 0)';
      };
      break;
    }
}

  resetValue(){
    this.new_client = {
      "birthdate": "",
      "firstname": "",
      "lastname": "",
      "identification": ""
  };
    this.form.reset({birthdate: '', firstname: '', lastname: '', identification: ''});
  }

  calcularEdad(fechaNacimiento)
  {
      var birthday_arr = fechaNacimiento.split("-");
      var birthday_date = new Date(birthday_arr[2], birthday_arr[1] - 1, birthday_arr[0]);
      var ageDifMs = Date.now() - birthday_date.getTime();
      var ageDate = new Date(ageDifMs);
      
      return Math.abs(ageDate.getUTCFullYear() - 1970);
  }
  
 
   async onSubmit(){
    if(this.form.status === 'VALID'){

      /* Se verifica que no exista la identificacion */
      this.isRegistered  =false;
      let promise = new Promise((resolve, reject) => {
          this._requestAccessBankService.getClientes().subscribe(
                response => {
                   let entries =  Object.entries(response);
           
                     for (let [fruit, count] of entries) {
                       this.ids.push(count.identification);    
                     }
         
                     if(this.ids.includes(this.form.value.identification)){
                       this.isRegistered = true;
                       resolve(this.isRegistered);
                     }
               },
             error => {}
           );
           resolve(this.isRegistered);   
      });
   
      let item = await promise;
      if(this.isRegistered){
          this.openAlertDialog('<span >Error:</span> \n La identificacion ya existe, ingresa otra. ');
         return;
      }

      /* Se verifica la edad: */
      this.new_client.birthdate =  this.datePipe.transform(this.form.value.birthdate,'dd-MM-yyyy');

     
      if(this.calcularEdad(this.new_client.birthdate) <= 18)
      {
        this.openAlertDialog('Error: \n Tienes que tener mas de 18 años para continuar. ');
        return;
      }

      this.new_client.firstname = this.form.value.firstname;
      this.new_client.lastname = this.form.value.lastname;
      this.new_client.identification = this.form.value.identification;
     
      /* Si todo esta correcto, agregamos el usuario */
      this._requestAccessBankService.addUser(this.new_client).subscribe(
        response => {
        
          this.openAlertDialog("Registro guardado correctamente"+", Ya puedes buscarte en (Clientes registrados) con tu identificacion: "+this.form.value.identification
          +" Clave Unica Generada: ("+response.name+")");
          this.resetValue();
        },
        error => {

          this.openAlertDialog('Lo sentimos, ha ocurrido un error: ' +<any>error);
          console.log('Lo sentimos, ha ocurrido un error: ' +<any>error);
        }
      );

    
    }
  }

}
