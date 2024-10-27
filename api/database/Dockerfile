FROM node:20.18.0

# Recuopera las variables enviadas desde el docker-compose.yml
ARG SERVICE_PORT
ARG MYSQL_CONTAINER_PORT

# Ya que las Variables recuperadas con ARGs solo existen durante la etapa de compilación, la guardo en otra variable "PORT" para que pueda ser consumida con posterioridad
ENV PORT=${SERVICE_PORT}
ENV MYSQL_CONTAINER_PORT=${MYSQL_CONTAINER_PORT}

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

# No es necesario que el script wait-for-it.sh esté almacenado específicamente en /usr/local/bin/wait-for-it. Puedes colocarlo en cualquier otra ubicación dentro del contenedor, siempre que el archivo sea accesible y ejecutable desde esa ruta. 
# La carpeta /usr/local/bin/ es simplemente una ubicación estándar en los sistemas Linux/Unix para almacenar binarios y scripts ejecutables, que están automáticamente en el "PATH" del sistema. Esto significa que, al colocar el script en esa ubicación, puedes ejecutarlo fácilmente desde cualquier lugar sin especificar la ruta completa.
COPY ./wait-for-it.sh /usr/local/bin/wait-for-it

# El comando chmod en Linux se usa para cambiar los permisos de un archivo. En este caso, +x le otorga permisos de ejecución, es decir, hace que el archivo pueda ejecutarse como un programa.
# +x: Este es el modificador que significa "añadir permisos de ejecución" para el archivo.
# Después de este comando, el script wait-for-it.sh podrá ejecutarse como un comando en el sistema, es decir, podrás usarlo en el contenedor como si fuera un programa instalado.
RUN chmod +x /usr/local/bin/wait-for-it

RUN npm run build 

EXPOSE ${PORT}

# No se puede usar múltiples CMD en un Dockerfile, ya que Docker permite un solo CMD por contenedor. Sin embargo, se puede usar múltiples comandos RUN, pero estos se ejecutan en el momento de construir la imagen, no cuando se inicia el contenedor.
# Dado que quiero ejecutar npm run migrate y npm run start después de que MySQL esté listo, esto debe ocurrir en el momento de arranque del contenedor, no durante la construcción de la imagen. Para hacerlo, necesito combinarlos en un solo CMD, ya que es el comando que se ejecuta al iniciar el contenedor.
# 
CMD /usr/local/bin/wait-for-it mysql:${MYSQL_CONTAINER_PORT} --timeout=60 --strict -- npm run migrate && npm run start

# OPCION 2 para los MULTIPLES COMANDOS CMD

# Una forma de separar los comandos CMD es combinando los comandos en un script bash. Este script esperará a que MySQL esté listo, ejecutará las migraciones y luego iniciará la aplicación.

# archivo de script llamado entrypoint.sh:
#  -----------
    #     # Esperar a que MySQL esté listo
    #     /usr/local/bin/wait-for-it mysql:${MYSQL_PORT} --timeout=60 --strict
    
    #     # Correr las migraciones
    #     npm run migrate
    
    #     # Iniciar la aplicación
    #     npm run start
#  -----------


#  Se debe copiar y dar permisos de que sea ejecutable como lo hicimos con el wait-for-it.sh, ANTES del RUN npm run build
# COPY ./entrypoint.sh /usr/local/bin/entrypoint.sh
# RUN chmod +x /usr/local/bin/entrypoint.sh

# Y luego se puede usar el script como punto de entrada
# CMD ["/usr/local/bin/entrypoint.sh"]