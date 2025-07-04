import { User } from '../../src/app/models/user';

describe('Air Quality App', () =>{
  

  beforeEach(() => {
    cy.visit('http://localhost:4200/');
    logIn();
  });

  afterEach(() => {
    logOut()
  })

  function logIn(){
    cy.get('#email1').type('a'); 
    cy.get('#password1 input').type('a'); 
    cy.contains('Iniciar Sesión').click();
  }

  function logOut(){
    cy.get('.col-12 > .p-link > .pi').click();
    cy.contains('Está seguro de Cerrar Sesión?');
    cy.get('.p-confirm-dialog-accept').click(); 
  }

  /*   Revision del contenido*/
  // it('Este habilitado el contenido web', () => {
  //     cy.contains('Quality Air!');
  // });

  /*         Iniciar y cerrar sesion     */
  it('Iniciar sesion y cerrar sesion', () => {
  });

  /*Recorrer dos veces por cada opcion de Quality Air */
  it('Recorrer por cada opcion de Quality Air 2 veces y cerrar sesion',()=>{
    for (let i=0; i<2; i++){
      cy.get('.ng-tns-c183498709-7.ng-tns-c183498709-6 > .p-ripple').click();
      cy.get('.ng-tns-c183498709-8.ng-tns-c183498709-6 > .p-ripple').click();
      cy.get('.ng-tns-c183498709-9.ng-tns-c183498709-6 > .p-ripple').click();
      cy.get('.ng-tns-c183498709-10.ng-tns-c183498709-6 > .p-ripple').click();
      cy.get('.ng-trigger > .ng-tns-c183498709-11 > .p-ripple').click();  
    };
  });
 

  /*Crear*/
    /* Crear 10 usuarios*/

  const usuarios: User[] = [
    { id:null, name: 'Ivan', lastName: 'Simbaña', dni: '1727393777', nickName: 'ivandario1999', date: new Date('1999-06-16'), email: 'isimba25@gmail.com', password: '12345678' ,status: true},
    { id:null, name: 'Juan', lastName: 'Perez', dni: '1727393778', nickName: 'juanperez', date: new Date('1988-02-12'), email: 'juanperez@gmail.com', password: '87654321' , status: true},
    { id:null, name: 'Maria', lastName: 'Lopez', dni: '1727393779', nickName: 'marialopez', date: new Date('1995-04-23'), email: 'marialopez@gmail.com', password: 'password123',status: true },
    { id:null, name: 'Carlos', lastName: 'Ramirez', dni: '1727393780', nickName: 'carlosramirez', date: new Date('1992-07-10'), email: 'carlosramirez@gmail.com', password: 'carlospass',status: true },
    { id:null, name: 'Ana', lastName: 'Martinez', dni: '1727393781', nickName: 'anamartinez', date: new Date('2000-11-30'), email: 'anamartinez@gmail.com', password: 'ana12345',status: true },
    { id:null, name: 'Luis', lastName: 'Fernandez', dni: '1727393782', nickName: 'luisfernandez', date: new Date('1985-09-05'), email: 'luisfernandez@gmail.com', password: 'luis1234',status: true },
    { id:null, name: 'Laura', lastName: 'Gomez', dni: '1727393783', nickName: 'lauragomez', date: new Date('1993-03-18'), email: 'lauragomez@gmail.com', password: 'laura321',status: true },
    { id:null, name: 'Daniel', lastName: 'Hernandez', dni: '1727393784', nickName: 'danielhernandez', date: new Date('1997-12-24'), email: 'danielhernandez@gmail.com', password: 'danielpass',status: true },
    { id:null, name: 'Sofia', lastName: 'Morales', dni: '1727393785', nickName: 'sofiamorales', date: new Date('2001-06-02'), email: 'sofiamorales@gmail.com', password: 'sofiapass',status: true},
    { id:null, name: 'Ricardo', lastName: 'Gutierrez', dni: '1727393786', nickName: 'ricardog', date: new Date('1989-08-15'), email: 'ricardog@gmail.com', password: 'ricardo456',status: true }
  ];



  describe('Crear', () => {
    function crearUsuario({ name, lastName, dni, nickName, date, email, password }: User) {
      cy.get('#name').type(name);
      cy.get('#lastName').type(lastName);
      cy.get('#dni').type(dni);
      cy.get('#nickname').type(nickName);
      if (date) {
          const formattedDate = date.toISOString().split('T')[0]; 
          cy.get('#date').type(formattedDate);
      }
      cy.get('#email').type(email);
      cy.get('#password').type(password);
      cy.get('#confirmPassword').type(password);
      cy.get('[label="Guardar"]').click();
    }


    it('Crear 10 usuarios', () => {
      cy.get('.ng-trigger > .ng-tns-c183498709-11 > .p-ripple').click();
      usuarios.forEach(usuario => {
        cy.get('.my-2 > .p-button-success').click(); 
        crearUsuario(usuario);
      });
    });
  });
  

  /*Revision*/
  describe('Revision',()=>{
    it('Revisar usuarios ingresados',()=>{
      cy.get('.ng-trigger > .ng-tns-c183498709-11 > .p-ripple').click();    
    });  
  })
 

  /*      Actualizar    */
     /* Datos a actualizar  */
  const updateUsers: User[] = [
    { id:null, name: 'IvanActualizado', lastName: 'SimbañaActualizado', dni: '1727393777', nickName: 'ivandario1999', date: new Date('1999-06-16'), email: 'isimbaActualizado25@gmail.com', password: '12345678' ,status: true},
    { id:null, name: 'JuanActualizado', lastName: 'PerezActualizado', dni: '1727393778', nickName: 'juanperez', date: new Date('1988-02-12'), email: 'juanperezActualizado@gmail.com', password: '87654321' , status: true},
    { id:null, name: 'MariaActualizado', lastName: 'LopezActualizado', dni: '1727393779', nickName: 'marialopez', date: new Date('1995-04-23'), email: 'marialopezActualizado@gmail.com', password: 'password123',status: true },
    { id:null, name: 'CarlosActualizado', lastName: 'RamirezActualizado', dni: '1727393780', nickName: 'carlosramirez', date: new Date('1992-07-10'), email: 'carlosramirezActualizado@gmail.com', password: 'carlospass',status: true },
    { id:null, name: 'AnaActualizado', lastName: 'MartinezActualizado', dni: '1727393781', nickName: 'anamartinez', date: new Date('2000-11-30'), email: 'anamartinezActualizado@gmail.com', password: 'ana12345',status: true },
    { id:null, name: 'LuisActualizado', lastName: 'FernandezActualizado', dni: '1727393782', nickName: 'luisfernandez', date: new Date('1985-09-05'), email: 'Actualizado@gmail.com', password: 'luis1234',status: true },
    { id:null, name: 'LauraActualizado', lastName: 'GomezActualizado', dni: '1727393783', nickName: 'lauragomez', date: new Date('1993-03-18'), email: 'lauragomezActualizado@gmail.com', password: 'laura321',status: true },
    { id:null, name: 'DanielActualizado', lastName: 'HernandezActualizado', dni: '1727393784', nickName: 'danielhernandez', date: new Date('1997-12-24'), email: 'danielhernandezActualizado@gmail.com', password: 'danielpass',status: true },
    { id:null, name: 'SofiaActualizado', lastName: 'MoralesActualizado', dni: '1727393785', nickName: 'sofiamorales', date: new Date('2001-06-02'), email: 'sofiamoralesActualizado@gmail.com', password: 'sofiapass',status: true},
    { id:null, name: 'RicardoActualizado', lastName: 'GutierrezActualizado', dni: '1727393786', nickName: 'ricardog', date: new Date('1989-08-15'), email: 'ricardogActualizado@gmail.com', password: 'ricardo456',status: true }
  ];

  function updateUserField(fieldId:string, newValue:string, password:string) {
    cy.get(`#${fieldId}`).clear().type(newValue);
    cy.get('#confirmPassword').type(password);
    cy.get('[label="Guardar"]').click();
  }
  
  describe('Actualizar datos de usuario', () => {
    it('Actualizar nombres de los usuarios', () => {
      cy.get('.ng-trigger > .ng-tns-c183498709-11 > .p-ripple').click();
      updateUsers.forEach((user, index) => {
        cy.get(`:nth-child(${index + 1}) > :nth-child(9) > .flex > .p-button-success`).click();
        updateUserField('name', user.name, user.password);
      });
    });
  
    it('Actualizar apellidos de los usuarios', () => {
      cy.get('.ng-trigger > .ng-tns-c183498709-11 > .p-ripple').click();
      updateUsers.forEach((user, index) => {
        cy.get(`:nth-child(${index + 1}) > :nth-child(9) > .flex > .p-button-success`).click();
        updateUserField('lastName', user.lastName, user.password);
      });
    });
  
    it('Actualizar correo de los usuarios', () => {
      cy.get('.ng-trigger > .ng-tns-c183498709-11 > .p-ripple').click();
      updateUsers.forEach((user, index) => {
        cy.get(`:nth-child(${index + 1}) > :nth-child(9) > .flex > .p-button-success`).click();
        updateUserField('email', user.email, user.password);
      });
    });
  });

  /* Eliminar */
  describe('Eliminar usuario', () => {
    for (let i = 1; i <= 10; i++) {
      it(`Eliminar usuario ${i}`, () => {
        cy.get('.ng-trigger > .ng-tns-c183498709-11 > .p-ripple').click();
        cy.get(':nth-child(1) > :nth-child(9) > .flex > .p-button-warning').click();
        cy.get('[icon="pi pi-check"]').click();
      });
    }
  });
  
  /*Volver a crear los 10 usuarios*/
  describe('Crear', () => {
    function crearUsuario({ name, lastName, dni, nickName, date, email, password }: User) {
      cy.get('#name').type(name);
      cy.get('#lastName').type(lastName);
      cy.get('#dni').type(dni);
      cy.get('#nickname').type(nickName);
      if (date) {
          const formattedDate = date.toISOString().split('T')[0]; 
          cy.get('#date').type(formattedDate);
      }
      cy.get('#email').type(email);
      cy.get('#password').type(password);
      cy.get('#confirmPassword').type(password);
      cy.get('[label="Guardar"]').click();
    }


    it('Crear 10 nuevos usuarios', () => {
      cy.get('.ng-trigger > .ng-tns-c183498709-11 > .p-ripple').click();
      usuarios.forEach(usuario => {
        cy.get('.my-2 > .p-button-success').click(); 
        crearUsuario(usuario);
      });
    });
  });

  /* Eliminar a los usuarios de forma conjunta */
  describe('Eliminar',() => {
    it('Eliminar usuarios de forma conjunta',() => {
      cy.get('.ng-trigger > .ng-tns-c183498709-11 > .p-ripple').click();
      cy.get('[style="width: 3rem;"] > .p-element').click();
      cy.get('.p-button-danger').click();
      cy.get('[icon="pi pi-check"]').click();
    })
  })
});

describe('Iniciar sesion',() =>{
  it('Iniciar sesion con uno de los 20 nuevos usuarios',()=>{
    cy.visit('http://localhost/');
    cy.get('#email1').type('isimbaActualizado25@gmail.com'); 
    cy.get('#password1 input').type('12345678'); 
    cy.contains('Iniciar Sesión').click();
    cy.get('.col-12 > .p-link > .pi').click();
    cy.contains('Está seguro de Cerrar Sesión?');
    cy.get('.p-confirm-dialog-accept').click(); 
  })  

})
  
