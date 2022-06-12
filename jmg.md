# ARAB COLOMBIAN 
tareas a realizar para **arab colombian**
-	Al editar deal falta funcion (no edita)
-	En Accounts  no muestra Deals Activos
-	En la vista Employees al crear uno nuevo no cierra el modal ni da mensaje de éxito
-	Revisar el buscador en Accounts y Deals
-	Crear y revisar los filtros en los encabezados de las tablas
-	Agregar en Accounts un campo que se llame Origen
-	Quitar de las cuentas PRIORIDAD
-	En editar contactos quitar prioridad y tipo y company
-	Cambiar el campo ciudad de las cuentas y contacto y poner el campo como text mas no como select
-	Revisar CSS para mejorar la interfaz
-	En el Nav, hacer servir las fotos de perfil (arreglarlas dentro de employees)
-	Revisar la parte de comentarios o tareas
-	Crear un campo llamado productos en las cuentas tipo texto
-	En Accounts al crear 2 nuevos campos, uno que diga Partida y otro Productos
-	Sistema de login

### 1. Al editar deal falta funcion
Creando funcionalidad con la función **formHandler** situada en *EditDeal* línea: 27, su función es enviar esta serie de propiedades al backend
```
closeProbability: "23"
dealCreationDate: "2022-06-11"
dealLength: "2"
dealValue: "30000"
expectedCloseDate: "2022-06-11"
owner: "6248ae212e81fe0bcfd2a7a5"
priority: "Medio"
stage: "Lead"
tasks: "Obs 1: El viernes tiene reunión pa
```
### 2. En Accounts no muestra Deals Activos
Solución en el componente *ListAccounts* línea: 105 todos listo para recibir la información del backend
### 3. En la vista Employees al crear uno nuevo no cierra el modal ni da mensaje de éxito
Para el manejo de este problema se creó el componente *EmployeeModal*
donde se encuentra todo el formulario de newEmployee

Por Otra parte, en el componente Employees se encontró la falta de funcionalidad en eliminar employee, se creó la funcionalidad **handleDelete** en la linea: 25;

### 4. Revisar el buscador en Accounts y Deals
El filtro anterior hacía peticiones excesivos al backend, este fue remplazado por **onSearching** linea: 45 Deals y linea 68 para Accounts
### 5. Crear y revisar los filtros en los encabezados de las tablas
Se añadió un buscador en Employee, con la funcionalidad **onSearching** linea: 60,
tambien se refactoriso *GetEmployees.js* para poder manipular mejor la respuesta.
###  6. Agregar en Accounts un campo que se llame Origen
Se agregó el campo origen en *ListAccounts* linea: 94 de tipo input conectado al formulario de editar
```
<input
	key={index}
	className="inputContact"
	type="text"
	name="origen"
	id="origen"
 	value={item.propiedad}
/>
```
### 7. Quitar de las cuentas PRIORIDAD
Se eliminó prioridad de cuentas, así como también de los formularios de crear y editar cuentas.
### 8. 9. En editar contactos quitar prioridad y tipo y company
Se eliminó los campos del formulario crear cuenta
y el campo de ciudad ahora es tipo text
### Revisar CSS para mejorar la interfaz
Se arregló algunas vistas como la de employee y se colocó fondo negro en algunos modales
### 12. Revisar la parte de comentarios o tareas
El campo fue conectado al formulario de editar
### 13. Crear un campo llamado productos en las cuentas tipo texto
El campo productos fue creado de tipo text con estas propiedades, en cuentas
```
<input
	type="text"
	name="email"
	id="products"
	className="border emailInput"
	value={item.products}
/>
```
### 14. En Accounts al crear 2 nuevos campos, uno que diga Partida y otro Productos
Se agregó 2 nuevos campos en el formulario de crear accounts, se creó un componente *selectPartida* para poder renderizar las partidas
#### 15 Login
Para este sistema se modificó el contextCalendar ahora llamado Context, para poder albergar el flujo de auth este context ahora retorna funcionalidades para el auth.

El componente de Login espera recibir dos campos para poder llevar a cabo la autenticación, el email y la contraseña deben coincidir con el registro que se encuentra en el backend, la función **login()** espera recibir del backend un token donde se encuentre la siguiente estructura.
```
    token = {
		ip: 'ipDirection',
		sub:{
			name: 'userName',
			image: 'url/image',
		},
    }
```
