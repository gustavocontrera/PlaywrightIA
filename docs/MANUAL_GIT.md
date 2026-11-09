# MANUAL DEFINITIVO DE GIT & GITHUB
### Guía Práctica, Moderna y Optimizada (De Cero a Profesional)

---

## 📑 ÍNDICE DE CONTENIDOS

1. [Configuración Inicial y Entorno (Windows / Git Bash)](#1-configuración-inicial-y-entorno)
2. [Comandos Clásicos vs. Comandos Modernos (Actualización Git 2.23+)](#2-comandos-clásicos-vs-comandos-modernos)
3. [El Ciclo de Vida de los Archivos y Flujo Diario](#3-el-ciclo-de-vida-de-los-archivos-y-flujo-diario)
4. [Gestión Efectiva de Ramas (Branches)](#4-gestión-efectiva-de-ramas-branches)
5. [Fusiones y Resolución de Conflictos (Merge)](#5-fusiones-y-resolución-de-conflictos-merge)
6. [Trabajando con Repositorios Remotos (GitHub / GitLab)](#6-trabajando-con-repositorios-remotos-github--gitlab)
7. [Colaboración Profesional: Forks, Pull Requests y Upstream](#7-colaboración-profesional-forks-pull-requests-y-upstream)
8. [Etiquetado y Versiones (Git Tags & Releases)](#8-etiquetado-y-versiones-git-tags--releases)
9. [Productividad: Git Stash, Worktree y Alias Esenciales](#9-productividad-git-stash-worktree-y-alias-esenciales)
10. [Control de Daños y Viajes en el Tiempo (Reset, Revert, Reflog)](#10-control-de-daños-y-viajes-en-el-tiempo)
11. [Rebase: Limpieza de Historial sin Riesgos](#11-rebase-limpieza-de-historial-sin-riesgos)
12. [Buenas Prácticas, Nomenclatura y Archivos Especiales](#12-buenas-prácticas-nomenclatura-y-archivos-especiales)
13. [Cheat Sheet: Los Comandos del Día a Día](#13-cheat-sheet-los-comandos-del-día-a-día)

---

## 1. Configuración Inicial y Entorno

Al instalar Git o iniciar en un nuevo equipo, estas configuraciones se aplican una sola vez:

```bash
# 1. Verificar versión instalada
git --version

# 2. Configurar identidad global (obligatorio para firmar commits)
git config --global user.name "Tu Nombre o Alias"
git config --global user.email "tu-correo@ejemplo.com"

# 3. Establecer 'main' como rama predeterminada globalmente
# (Evita la discrepancia histórica entre 'master' y 'main')
git config --global init.defaultBranch main

# 4. Solución al salto de línea en Windows (Evita el warning de CRLF)
git config --global core.autocrlf true

# 5. Listar todas las configuraciones activas
git config --list --show-origin

# 6. Editar archivo de configuración en terminal (Vim)
git config --global -e
# [Tip Vim]: Presiona 'i' para insertar/editar.
# Para guardar y salir: Esc y escribe :wq! + Enter
# Para salir sin guardar: Esc y escribe :q! + Enter
```

---

## 2. Comandos Clásicos vs. Comandos Modernos

> 💡 **AVISO DE ACTUALIZACIÓN (Git 2.23+):**  
> Históricamente, `git checkout` se usaba para demasiadas cosas diferentes: cambiar de rama, crear ramas, descartar cambios de archivos y recuperar versiones. Git introdujo dos comandos dedicados, más seguros y con nombres claros:
> - **`git switch`**: Exclusivo para ramas.
> - **`git restore`**: Exclusivo para archivos y staging.

| Acción requerida | Comando Clásico (Antiguo) | Comando Moderno Recomendado | Motivo del cambio |
| :--- | :--- | :--- | :--- |
| **Cambiar de rama** | `git checkout <rama>` | `git switch <rama>` | Mayor claridad conceptual |
| **Crear y cambiar de rama** | `git checkout -b <nueva-rama>` | `git switch -c <nueva-rama>` | `-c` viene de `--create` |
| **Quitar archivo del Stage** | `git reset HEAD <archivo>` | `git restore --staged <archivo>` | `reset` es peligroso si se usa mal |
| **Descartar cambios locales** | `git checkout -- <archivo>` | `git restore <archivo>` | No se confunde con cambiar rama |
| **Descartar todo en el repo** | `git checkout -- .` | `git restore .` | Operación limpia y explícita |
| **Guardar en stash con nota** | `git stash save "mensaje"` | `git stash push -m "mensaje"` | `save` está deprecado formalmente |

---

## 3. El Ciclo de Vida de los Archivos y Flujo Diario

Git opera sobre tres áreas locales: **Directorio de Trabajo** (Working Tree), **Área de Preparación** (Staging/Index) y **Repositorio** (Historial de commits).

```
[ Directorio de Trabajo ]  --( git add )-->  [ Área de Preparación (Stage) ]  --( git commit )-->  [ Repositorio Local (.git) ]
         ^                                                   |
         |------------------( git restore )-------------------|
```

### 3.1. Iniciar o Clonar
```bash
# Iniciar un repositorio en la carpeta actual
git init

# Clonar un repositorio remoto existente
git clone https://github.com/usuario/repositorio.git
# Nota: Git crea automáticamente la subcarpeta con el proyecto dentro.
```

### 3.2. Estado y Preparación (Stage)
```bash
# Ver estado detallado
git status

# Ver estado resumido y limpio (muy recomendado)
git status -sb

# Agregar archivos al escenario
git add .                  # Agrega todos los cambios del directorio actual
git add archivo.txt        # Agrega un archivo puntual
git add *.md               # Agrega todos los archivos con extensión .md
git add src/*.js           # Agrega archivos dentro de una carpeta específica

# Sacar del escenario sin perder los cambios en el archivo
git restore --staged archivo.txt
```

### 3.3. Confirmar Cambios (Commit)
```bash
# Commit con mensaje directo
git commit -m "feat: implementar autenticación de usuarios"

# Add y Commit en un solo paso (Solo aplica para archivos YA rastreados previamente)
git commit -am "fix: corregir validación de formulario"

# Modificar el mensaje del último commit (o sumarle archivos olvidados)
git commit --amend -m "feat: implementar autenticación con JWT"
```

### 3.4. Inspección de Cambios e Historial
```bash
# Ver diferencias de archivos aún no agregados al stage
git diff

# Ver diferencias de lo que ya está en el stage listo para commitear
git diff --staged

# Ver el historial de commits
git log --oneline --graph --decorate --all
```

---

## 4. Gestión Efectiva de Ramas (Branches)

Las ramas te permiten desarrollar funcionalidades de manera aislada sin alterar la versión estable (`main`).

```bash
# Listar ramas locales (* indica la rama activa)
git branch

# Listar ramas locales y remotas
git branch -a

# Ver ramas con información de commits y seguimiento remoto
git branch -vv

# Crear una nueva rama sin moverse de la actual
git branch feature/nueva-pantalla

# Moverse a una rama existente (Moderno)
git switch feature/nueva-pantalla

# Crear una nueva rama y cambiarse a ella en un solo paso
git switch -c feature/login-google
# (Equivalente antiguo: git checkout -b feature/login-google)

# Renombrar la rama actual
git branch -m nuevo-nombre-rama

# Eliminar una rama ya fusionada
git branch -d feature/login-google

# Forzar eliminación de una rama no fusionada
git branch -D feature/login-google
```

---

## 5. Fusiones y Resolución de Conflictos (Merge)

Para integrar el código de una rama secundaria a la rama principal:

### 5.1. Fusión Limpia (Fast-Forward)
```bash
# 1. Siempre pararse primero en la rama que RECIBIRÁ los cambios
git switch main

# 2. Traer los cambios de la rama secundaria
git merge feature/nueva-pantalla

# 3. Eliminar la rama secundaria si ya no se utilizará
git branch -d feature/nueva-pantalla
```

### 5.2. Resolución de Conflictos
Si se modificó la misma línea del mismo archivo en ambas ramas:
1. Git pausará el merge e indicará los archivos en conflicto.
2. Abre el archivo en tu editor de código (VS Code, IntelliJ, etc.).
3. Elige entre tus cambios (`Incoming`), los existentes (`Current`) o ambos.
4. Guarda el archivo limpio.
5. Registra la resolución:
```bash
git add archivo-arreglado.js
git commit -m "merge: resolver conflicto entre main y feature"
```

---

## 6. Trabajando con Repositorios Remotos (GitHub / GitLab)

### 6.1. Conectar un proyecto local existente a un repositorio remoto vacío
```bash
# 1. Inicializar si no estaba iniciado
git init

# 2. Renombrar la rama a main
git branch -M main

# 3. Vincular con la URL remota
git remote add origin https://github.com/usuario/mi-proyecto.git

# 4. Primer push estableciendo upstream (-u)
git push -u origin main
```

### 6.2. Sincronización Diaria
```bash
# Verificar URLs remotas configuradas
git remote -v

# Descargar y fusionar los cambios del servidor (Buenas prácticas: siempre antes de pushear)
git pull

# Descargar información del remoto sin fusionar automáticamente (para inspeccionar)
git fetch

# Limpiar del registro local las ramas remotas que fueron eliminadas en GitHub
git fetch --prune origin
# o bien: git remote prune origin

# Subir commits locales al servidor
git push

# Subir una rama nueva por primera vez
git push -u origin feature/mi-rama
```

---

## 7. Colaboración Profesional: Forks, Pull Requests y Upstream

Cuando colaboras en repositorios de terceros o de tu empresa sin permisos directos de escritura en la rama principal:

```
[ Repo Original (Upstream) ] ---- (Fork) ----> [ Tu Repo Remoto en GitHub (Origin) ]
            |                                                      ^
            | (git pull upstream main)                             | (git push origin)
            v                                                      |
                             [ Tu Entorno Local ]
```

### 7.1. Flujo con Fork
1. Realiza el **Fork** desde la interfaz web de GitHub a tu cuenta.
2. Clona **tu** fork a tu computadora:
   ```bash
   git clone https://github.com/tu-usuario/proyecto-fork.git
   ```
3. Agrega el repositorio de la empresa/original como `upstream`:
   ```bash
   git remote add upstream https://github.com/organizacion/proyecto-original.git
   ```
4. Mantén tu fork siempre sincronizado con los cambios originales:
   ```bash
   git fetch upstream
   git switch main
   git merge upstream/main
   git push origin main
   ```

### 7.2. Crear el Pull Request (PR)
1. Crea una rama para tu tarea: `git switch -c feature/tarea-123`
2. Realiza cambios, `git add .` y `git commit -m "feat: completar tarea"`.
3. Sube la rama a **tu** fork: `git push -u origin feature/tarea-123`.
4. Ve a GitHub y haz click en **Compare & pull request**.
5. Si te solicitan ajustes: haz los cambios en tu misma rama local, commitea y vuelve a hacer `git push`. El PR se actualizará automáticamente.

---

## 8. Etiquetado y Versiones (Git Tags & Releases)

Los tags se utilizan como puntos de control para marcar versiones formales de lanzamiento (SemVer: v1.0.0, v2.1.0).

```bash
# Listar todos los tags existentes
git tag

# Crear un Tag Ligero en el commit actual
git tag v1.0.0

# Crear un Tag Anotado con mensaje y autor (Recomendado para producción)
git tag -a v1.0.0 -m "Release versión 1.0.0 estable"

# Crear tag en un commit específico del pasado
git tag -a v0.9.0 3a5b7c9 -m "Versión beta inicial"

# Ver los detalles completos de un tag
git show v1.0.0

# Eliminar un tag local
git tag -d v1.0.0

# Subir un tag puntual a GitHub
git push origin v1.0.0

# Subir TODOS los tags locales a GitHub en una sola orden
git push --tags

# Eliminar un tag remoto en GitHub
git push origin --delete v1.0.0
```

---

## 9. Productividad: Git Stash, Worktree y Alias Esenciales

### 9.1. Git Stash (Guardado Temporal de Cambios)
Útil para limpiar el directorio de trabajo momentáneamente sin necesidad de commitear código incompleto.

```bash
# Guardar cambios sin commitear con una nota descriptiva
git stash push -m "wip: formulario a medio hacer"

# Listar todos los stashes guardados
git stash list

# Ver qué archivos cambiaron en el último stash
git stash show

# Recuperar los cambios y BORRAR el stash de la lista
git stash pop

# Recuperar los cambios MANTENIENDO el stash guardado
git stash apply stash@{0}

# Eliminar un stash específico
git stash drop stash@{0}

# Vaciar todos los stashes por completo
git stash clear
```

### 9.2. Git Worktree (La Alternativa Superior a Stash para Múltiples Tareas)
Permite tener **múltiples ramas activas simultáneamente en carpetas independientes**, sin clonar de nuevo y compartiendo la misma base `.git`.

```bash
# Crear una nueva carpeta de trabajo vinculada a una rama existente
git worktree add ../hotfix-urgente main

# Crear una nueva carpeta vinculada a una rama nueva
git worktree add -b feature-nueva ../otra-feature

# Ver worktrees activos
git worktree list

# Eliminar el worktree cuando finalice la tarea (NO borrar la carpeta a mano)
git worktree remove ../hotfix-urgente
```

### 9.3. Alias de Productividad Recomendados
Copia y pega estos comandos en tu terminal una sola vez para crear atajos ultrarrápidos:

```bash
# 'git s' -> Estado corto con información de rama
git config --global alias.s "status -sb"

# 'git c' -> Commit con mensaje directo
git config --global alias.c "commit -m"

# 'git co' / 'git sw' -> Atajos de cambio de rama
git config --global alias.sw "switch"

# 'git lg' -> Gráfico de commits estilizado, a color y súper legible
git config --global alias.lg "log --graph --abbrev-commit --decorate --format=format:'%C(bold blue)%h%C(reset) - %C(bold green)(%ar)%C(reset) %C(white)%s%C(reset) %C(dim white)- %an%C(reset)%C(bold yellow)%d%C(reset)' --all"
```

---

## 10. Control de Daños y Viajes en el Tiempo

### 10.1. Modificar y Revertir
```bash
# Restaurar un archivo puntual al estado de un commit previo
git restore --source=2a8c947 src/archivo.js

# Crear un nuevo commit que deshace exactamente lo que hizo un commit anterior
# (La forma más segura en ramas públicas porque no altera la historia)
git revert 2a8c947
```

### 10.2. Git Reset (Enfoque Local)
```bash
# Deshacer el último commit MANTENIENDO los cambios en el Stage
git reset --soft HEAD~1

# Deshacer el último commit MANTENIENDO los cambios en el Directorio (sin Stage)
git reset --mixed HEAD~1

# ¡PELIGRO! Borrar el último commit y descartar TODO el código no guardado
git reset --hard HEAD~1
```

### 10.3. Git Reflog (El Salva-Vidas Definitivo)
Git registra cada movimiento del puntero `HEAD`. Aunque hayas hecho un `reset --hard` o borrado una rama por accidente, **el código sigue vivo temporalmente**.

```bash
# 1. Ver todo el historial de movimientos recientes con sus identificadores
git reflog

# 2. Restaurar tu repositorio exactamente al estado en que estaba antes del desastre
git reset --hard HEAD@{2}
# o mediante el hash del reflog:
git reset --hard a1b2c3d
```

---

## 11. Rebase: Limpieza de Historial sin Riesgos

El comando `git rebase` toma los commits de tu rama y los "vuelve a aplicar" sobre la punta de otra rama, dejando un historial lineal sin commits innecesarios de merge.

```bash
# Traer las novedades de main a tu rama feature
git switch feature/mi-rama
git rebase main

# Rebase interactivo para unir (squash) o corregir (reword) los últimos 3 commits
git rebase -i HEAD~3
```

> ⚠️ **REGLA DE ORO DEL REBASE:**  
> **NUNCA** hagas rebase sobre una rama pública compartida (como `main` o ramas donde otros desarrolladores estén trabajando). Usa Rebase únicamente en tus ramas de trabajo locales personales antes de enviarlas al Pull Request.

---

## 12. Buenas Prácticas, Nomenclatura y Archivos Especiales

### 12.1. Nomenclatura Estándar para Ramas (Git Flow / Trunk Based)
Estructura recomendada en equipos profesionales:
- `feature/[id-tarea]-[breve-descripcion]` (ej: `feature/JIRA-104-login-auth0`)
- `fix/[id-tarea]-[breve-descripcion]` (ej: `fix/BUG-22-error-calculo-iva`)
- `hotfix/[descripcion]` (Correcciones críticas directas a producción)

### 12.2. Buenas Prácticas Diarias
1. **Commits atómicos**: Haz commits pequeños con una sola responsabilidad funcional.
2. **Mensajes claros**: Usa convenciones como *Conventional Commits* (`feat:`, `fix:`, `docs:`, `refactor:`, `test:`).
3. **Pulls frecuentes**: Haz `git pull` todas las mañanas y antes de empezar a escribir código nuevo.
4. **Respaldo de fin de día**: Si tu trabajo no está terminado, puedes subir tu rama privada a GitHub al terminar la jornada para respaldarlo en la nube.

### 12.3. Archivos Especiales
- **`.gitignore`**: Especifica archivos y carpetas que Git nunca debe rastrear (ej: `node_modules/`, `.env`, `dist/`, `.DS_Store`).
- **`.gitkeep`**: Git por diseño no rastrea carpetas vacías. Si necesitas subir una carpeta vacía a GitHub (ej: `uploads/`), crea un archivo vacío llamado `.gitkeep` dentro de ella:
  ```bash
  touch uploads/.gitkeep
  git add uploads/.gitkeep
  git commit -m "chore: persistir carpeta uploads vacía"
  ```

---

## 13. Cheat Sheet: Los Comandos del Día a Día

| Tarea Frecuente | Comando |
| :--- | :--- |
| Ver estado corto y rama | `git status -sb` (o `git s`) |
| Agregar todo y commitear | `git add . && git commit -m "mensaje"` |
| Crear y pasar a nueva rama | `git switch -c feature/nombre` |
| Volver a la rama main | `git switch main` |
| Actualizar con cambios remotos | `git pull` |
| Subir rama por primera vez | `git push -u origin <rama>` |
| Subir commits habituales | `git push` |
| Ver historial gráfico limpio | `git lg` |
| Descartar cambios en un archivo | `git restore <archivo>` |
| Sacar un archivo del stage | `git restore --staged <archivo>` |
| Guardar cambios temporalmente | `git stash push -m "nota"` |
| Recuperar cambios guardados | `git stash pop` |
| Resolver conflictos | Editar archivo -> `git add .` -> `git commit -m "merge..."` |

---
*Manual generado y optimizado para máxima productividad y buenas prácticas de ingeniería de software.*
