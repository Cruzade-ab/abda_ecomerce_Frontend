1. Configuración inicial:
    -git config --global user.name "Tu Nombre": Configura el nombre de usuario.
    -git config --global user.email "tu@email.com": Configura la dirección de correo electrónico.


2. Clonar un repositorio:
    -git clone <URL_del_repositorio>: Clona un repositorio remoto en tu máquina local.


3. Actualizar el repositorio local:
    -git pull origin <rama>: Actualiza tu rama local con los cambios del repositorio remoto.


4. Crear una rama:
    -git checkout -b <nombre_de_rama>: Crea y cambia a una nueva rama.


5. Cambiar de rama:
    -git checkout <nombre_de_rama>: Cambia a la rama especificada.


6. Guardar cambios locales:
    -git add . o git add <archivo>: A_grega cambios al área de preparación.
    -git commit -m "Mensaje del commit": Realiza un commit con los cambios.


7. Enviar cambios al repositorio remoto:
    -git push origin <nombre_de_rama>: Sube los cambios de tu rama local al repositorio remoto.


8. Sincronizar cambios en el repositorio remoto:
    -Antes de hacer un push, siempre es recomendable hacer un pull para asegurarse de tener los cambios más recientes.


9. Ver historial de cambios:
    -git log: Muestra el historial de commits.


10. Resolver conflictos:
    -En caso de conflictos al hacer un pull o merge, utiliza git mergetool o resuelve manualmente los conflictos en VSCode.


11. Cambiar a una versión anterior:
    -git checkout <hash_del_commit>: Cambia a una versión específica del código.