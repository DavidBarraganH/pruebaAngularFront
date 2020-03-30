import { Component,ViewChild, OnInit} from '@angular/core';
import { AccessBankService } from '../../services/access.bank.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Cliente } from '../../models/cliente.model';

@Component({
  selector: 'usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
  providers:[AccessBankService]
})


export class UsuariosComponent  implements OnInit{

  public displayedColumns = ['firstname', 'lastname', 'identification', 'birthdate'];
  public dataSource: MatTableDataSource<Cliente>;


  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor( private requestService: AccessBankService) {

    const clients: Cliente[] = []
        
    this.requestService.getClientes().subscribe(
      response => {   
      
        let entries = Object.entries(response);

          for (let [fruit, count] of entries) {
            clients.push(this.createNewClient(count.firstname,count.lastname,count.identification,count.birthdate));    
          }
          
          this.dataSource = new MatTableDataSource(clients);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
      },
      error => {}
    );
    
  }

  ngOnInit(): void {
  }
    
  applyFilter(filterValue: string) { 
      filterValue = filterValue.trim(); // Remove whitespace
      filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
      this.dataSource.filter = filterValue;
  }


    /** Builds and returns a new User. */
   createNewClient(firstname,lastname,identification,birthdate): Cliente {

      return {
        firstname:  firstname,
        lastname: lastname,
        identification: identification,
        birthdate: birthdate
      };
    }


}




