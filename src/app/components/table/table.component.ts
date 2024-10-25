import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service'; 
import { User } from '../../models/user';
import { MessageService } from 'primeng/api'; 
import { Table } from 'primeng/table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  providers: [MessageService] 
})

export class TableComponent implements OnInit {
  userDialog: boolean= false;
  deleteUserDialog: boolean = false;
  deleteUsersDialog:  boolean = false;
  users: User[] = [];
  user: User={
    id: null,
    name: '',
    lastName: '',
    cedula: '',
    fechaNacimiento: null,
    correo: '',
    password: '',
    status: true
  };
  confirmPassword: string='';
  selectedUsers: User[]=[];
  submitted: boolean=false;
  cols: any[]=[]
  statuses: any[] = [];
  rowsPerPageOptions = [5, 10, 20];
  loading: boolean = false;
 

  constructor(private userService: UserService, private messageService: MessageService ){}

  ngOnInit() {
    this.loadUsers();

    this.cols = [
      { field: 'name', header: 'name' },
      { field: 'lastName', header: 'lastName' },
      { field: 'cedula', header: 'cedula' },
      { field: 'fechaNacimiento', header: 'fechaNacimiento' },
      { field: 'password', header: 'password' }
    ]
  }

  loadUsers() {
    this.loading = true;
    this.userService.getUsers().subscribe({
      next: (data) => {
        console.log(data); 
        this.users = data; 
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar usuarios', err);
        this.loading = false;
      }
    });
  }

  openNew() {
    this.user = {
      id: null,
      name: '',
      lastName: '',
      cedula: '',
      fechaNacimiento: null,
      correo: '',
      password: '',
      status: true,
    };
    this.submitted = false;
    this.userDialog = true;
  }

  deleteSelectUsers(){
    this.deleteUsersDialog = true;
  }

  editUser(user: User){
    this.user = {...user }
    this.userDialog = true;
  }

  deleteUser(user: User){
    this.deleteUserDialog = true;
    this.user = {...user}
  }

  confirmDeleteSelected() {
    this.deleteUsersDialog = false;
  
    if (this.selectedUsers.length > 0) {
      const updateRequests = this.selectedUsers.map(selectedUser => {
        const updatedUser = { ...selectedUser, status: false }; // Crea una copia del usuario y cambia el estado
        return this.userService.updateUser(updatedUser).toPromise(); // Convierte a promesa
      });
  
      // Espera a que todas las solicitudes se completen
      Promise.all(updateRequests).then(() => {
        // Actualiza la lista local de usuarios
        this.selectedUsers.forEach(selectedUser => {
          const index = this.findIndexById(selectedUser.id!); // Asegúrate de que selectedUser.id no sea null
          if (index !== -1) {
            this.users[index] = { ...this.users[index], status: false }; // Actualiza el status en la lista
          }
        });
  
        // Muestra un mensaje de éxito
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Users deactivated successfully', life: 3000 });
        this.loadUsers(); // Vuelve a cargar los usuarios
      }).catch(err => {
        console.error('Error al desactivar usuarios', err);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to deactivate users', life: 3000 });
      });
  
      // Limpia la selección de usuarios después de que se complete la actualización
      this.selectedUsers = [];
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'No users selected', life: 3000 });
    }
  }
  
  togglePasswordVisibility(user: User) {
    user.showPassword = !user.showPassword;
}

  confirmDelete() {
  this.deleteUserDialog = false;

  if (this.user.id) {
   
    this.user.status = false; 
    
 
    this.userService.updateUser(this.user).subscribe({
      next: () => {
        if (this.user.id !== null) {
          const index = this.findIndexById(this.user.id);
    
          if (index !== -1) {
            this.users[index] = { ...this.users[index], status: false }; // Actualiza el status en la lista
          }
          
        }
        
        
        // Muestra un mensaje de éxito
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User deactivated successfully', life: 3000 });
        this.loadUsers();
      },
      error: (err) => {
        console.error('Error al desactivar usuario', err);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to deactivate user', life: 3000 });
      }
    });
  }

  // Reinicia el objeto usuario
  this.user = {
    id: null,
    name: '',
    lastName: '',
    cedula: '',
    fechaNacimiento: null,
    correo: '',
    password: '',
    status: true
  };
}

  

  hideDialog() {
    this.userDialog = false;
    this.submitted = false;
  }

  saveUser() {
    this.submitted = true;
  
    // Verificar que las contraseñas coincidan antes de continuar
    if (this.user.password !== this.confirmPassword) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Las contraseñas no coinciden', life: 3000 });
      return; // Detener el flujo si las contraseñas no coinciden
    }
  
    if (this.user.name?.trim()) {
      if (this.user.id) {
        this.userService.updateUser(this.user).subscribe({
          next: (updatedUser) => {
            if (this.user.id !== null) {
              const index = this.findIndexById(this.user.id);
              if (index !== -1) {
                this.users[index] = updatedUser;
              }
            }
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Updated', life: 3000 });
            this.loadUsers();
          },
          error: (err) => {
            console.error('Error al actualizar usuario', err);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update user', life: 3000 });
          }
        });
      } else {
        this.userService.addUser(this.user).subscribe({
          next: (newUser) => {
            this.users.push(newUser);
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Created', life: 3000 });
            this.loadUsers();
          },
          error: (err) => {
            console.error('Error al crear usuario', err);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to create user', life: 3000 });
          }
        });
      }
  
      this.userDialog = false;
      this.user = {
        id: null,
        name: '',
        lastName: '',
        cedula: '',
        fechaNacimiento: null,
        correo: '',
        password: '',
        status: true,
      };
    }
  }
  
  
  

  findIndexById(id: number): number {
    let index = -1;
    for(let i = 0; i < this.users.length; i++) {
        if(this.users[i].id === id) {
          index = i;
          break;
      }
    }
    return index;
  }

  createId(): number {
    return Math.floor(Math.random() * 100000); // Generates a random number as ID
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}
