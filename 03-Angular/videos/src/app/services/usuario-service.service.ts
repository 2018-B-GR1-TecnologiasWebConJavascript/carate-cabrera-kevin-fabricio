import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioServiceService {

  users: User[] = [
    {
      id: 1,
      name: "Kevin"
    },
    {
      id: 2,
      name: "Carate"
    }
  ];
  recordNumber = 3;

  constructor() { }

  create(user: User) {
    user.id = this.recordNumber;
    this.users.push(user);
    this.recordNumber++;
    return user;
  }

  delete(id: number) {
    const index = this.users.findIndex(user => {
      return user.id === id;
    });
    const deletedUser = JSON.parse(JSON.stringify(this.users[index]));
    this.users.splice(index, 1);
    return deletedUser;
  }

  update(id: number, updatedUser: User) {
    const index = this.users.findIndex(user => {
      return user.id === id;
    });
    this.users[index] = updatedUser;
    return updatedUser;
  }

  find(id: number) {
    return this.users.find(user => user.id === id);
  }
}

export interface User {
  id?: number;
  name?: string;
}
