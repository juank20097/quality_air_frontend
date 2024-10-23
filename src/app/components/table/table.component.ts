import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service'; 
import { User } from '../../models/user';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  customers1: User[] = [];
  loading: boolean = false;
  statuses: { label: string, value: number }[] = []; // Add this line to define the statuses property

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.loadUsers();
    this.initializeStatuses(); // Call this method to set up statuses
  }

  loadUsers() {
    this.loading = true;
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.customers1 = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar usuarios', err);
        this.loading = false;
      }
    });
  }

  clear(table: any) {
    table.clear();
  }

  onGlobalFilter(table: any, event: any) {
    table.filterGlobal(event.target.value, 'contains');
  }

  initializeStatuses() {
    this.statuses = [
      { label: 'Active', value: 1 },
      { label: 'Inactive', value: 0 }
    ];
  }
}
