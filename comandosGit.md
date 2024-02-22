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


# Comandos Git

---

### Pull

```jsx
  git pull origin main
```

### Fetch

             Copiar una rama de GitHub a la rama local.

```jsx
git fetch origin <branchGithub>:<nameLocalGitHubBranch>
```

### Crear Rama Local

```jsx
git checkout -b new_feature_branch
```

### De esa Rama Local a una Rama Remota

```jsx
git push origin your_local_branch:remote_branch_name
```

```jsx
git push -u origin new_feature_branch
```

To create a branch from a remote branch in Git, you first need to fetch the remote branch so that your local repository has the latest updates from the remote repository. Then you can create a new branch based on the fetched remote branch. Here are the steps:

1. **Fetch the remote branches:** Use the **`git fetch`** command to retrieve the latest updates from the remote repository, including all branches.
    
    ```bash
    
    git fetch origin
    
    ```
    
    This command fetches all branches from the remote named **`origin`**. If your remote has a different name, replace **`origin`** with the appropriate remote name.
    
2. **Check out the remote branch:** You need to check out the remote branch you want to base your new branch on.
    
    ```bash
    bashCopy code
    git checkout origin/remote-branch-name
    
    ```
    
    Replace **`remote-branch-name`** with the name of the remote branch you want to base your new branch on. This command puts you in a detached HEAD state, meaning you are not on any branch. Don't worry; this is temporary.
    
3. **Create a new local branch:** Now, create a new local branch based on the remote branch.
    
    ```bash
    bashCopy code
    git checkout -b new-branch-name
    
    ```
    
    Replace **`new-branch-name`** with the desired name for your new branch.
    
4. **Push the new branch to the remote repository (optional):** If you want to share your new branch with others or make it available on the remote repository, you can push it using:
    
    ```bash
    bashCopy code
    git push origin new-branch-name
    
    ```
    
    This command pushes your new branch to the remote repository named **`origin`**, making it available to others who have access to the repository.
    

To bring the changes from the main branch to your local branch **`develop-local`**, which is connected to the remote **`Develop`** branch, you can follow these steps using Git:

1. **Ensure your local `develop-local` branch is up to date with the remote `Develop` branch:**
    
    ```bash
    bashCopy code
    git checkout develop-local
    git pull origin Develop
    
    ```
    
    This will update your local **`develop-local`** branch with the latest changes from the remote **`Develop`** branch.
    
2. **Merge changes from the main branch (`main` or `master`) into your local `develop-local` branch:**
    
    ```bash
    bashCopy code
    git merge main
    
    ```
    
    Or if you're using a **`main`** branch:
    
    ```bash
    bashCopy code
    git merge master
    
    ```
    
    This command will merge changes from the main branch into your **`develop-local`** branch. Resolve any merge conflicts if they occur during the merge process.
    
3. **Push your changes to the remote `Develop` branch (if needed):**
    
    After merging the changes from the main branch into your local **`develop-local`** branch, you may want to push these changes to the remote **`Develop`** branch.
    
    ```bash
    bashCopy code
    git push origin develop-local:Develop
    
    ```
    
    This command will push your local **`develop-local`** branch to the remote **`Develop`** branch.
    

By following these steps, you will bring the changes from the main branch to your local branch **`develop-local`**, which is connected to the remote **`Develop`** branch, and then push those changes to the remote repository if necessary.