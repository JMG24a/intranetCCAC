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
-	Revisar la parte de comentarios o tareas (El back no recibe ni envia las tareas)
-	Crear un campo llamado productos en las cuentas tipo texto (backend no recibe ni envía el campo productos)
-	En Accounts al crear 2 nuevos campos, uno que diga Partida y otro Productos ()
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

### Bugs encontrados:
A lo largo del desarrollo se encontró diversas fallas de presentación de los estilos y funcionalidades como el cierre de modales, entre otras cosas, esta es una lista de lugares donde se corrigieron estos bugs:
- search en crear contactos
- icon lupa en search crear contactos
- fondo negro en accounts
- cierre automático del modal información de la cuenta
- corrección de estilos en employee (columnas mal alineadas)
- creación de 2 styled components para Accounts y Deals (archivos muy extensos de leer)
- función de eliminar employee
- la lista de contactos colapsaba al tener nombres cortos
- corrección en el posicionamiento de los modales
- corrigiendo la diferencia de colores en los formulario
- despues de completar un formulario no da respuesta de exito
- al crear una cuenta, y no agregarle un contacto la app, se bugea

### 15 Login
Para este sistema se modificó el contextCalendar ahora llamado Context, para poder albergar el flujo de auth este context ahora retorna funcionalidades para el auth.

El componente de Login espera recibir dos campos para poder llevar a cabo la autenticación, el email y la contraseña deben coincidir con el registro que se encuentra en el backend, la función **login()** espera recibir del backend un token junto con la informacion del usuario donde se espera recibir la siguiente estructura.
```
    token = { }
	user={
		name: "string",
		image: "string",
		role: "string"
	}

```
Si se desea agregar más información, debe dirigirse a *hook/useAuthHook.js* y modificar el objeto user.

Solo 2 páginas se encuentran accesibles sin estar registrado, si se desea agregar otra ruta sin restricciones de acceso deber modificar *components/includes/Navbar;*
y agregar la ruta en el array dentro de la función **validationSession**

##### Token:
Para poder hacer peticiones con autorización se debe llamar al contexto y traer la función **getToken** este retornará el token del usuario, listo para ser usado en las peticiones fetch

### Backend:
- 12 (El back no recibe ni envía las tareas)
- 13 (backend no recibe ni envía el campo productos)
- (Al crear una cuenta no recibe el producto y posiblemente tampoco la partida)
- (Accounts no recibe el campo comentarios que debe ser mostrado)
- (No se pueden eliminar los employee)
- (No se pueden editar los employee sugerencia de funcionalidad)
- (No se pueden eliminar los eventos del calendario)
- (En cuentas el back no envía la información de negocios activos)
- (Proteger los endpoints con el token que se generara al iniciar sesión)
- (crear un endpoint para refrescar el token)
