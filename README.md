# Department Web app.

# Descripción
Proyecto final del curso programación web, el proyecto consiste en una aplicacion para el Front End creada en React y otra segunda aplicación para el Back End utilizando NodeJS. Se utilizo como base de datos Mongo DB y la libreria de Mongoose para realizar la conexion a base de datos desde NodeJS.

Ambas aplicaciones incluyendo la base de datos se instalaron en contenedores de docker, se configuro un archivo YAML para levantar todos los servicios de la aplicación localmente. Por ultimo se utilizo el servicio en la nube de Azure para subir las imagenes de las aplicaciones a un contenedor en Azure y crear instancias para correr los contenedores. 


# Front End
La aplicación fue creada con React utilizando componentes de bootstrap, alert y Modal. Consiste en un CRUD basico donde se muestra información de apartamentos en venta, permite agregar, editar y eliminar información relacionada a los mismos. 

La aplicación se encuentra expuestar atravez de los servicios de Azure y se puede acceder atravez de la dirección ip: http://104.42.36.217:3000/ 


# Back End
La aplicación fue creada con NodeJS utilizando MongoDB para la pertinencia de los datos
