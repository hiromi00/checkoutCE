# checkoutCE

Proyecto final para la materia "Tolerancia a fallas"
#### Contribuyentes: 
+ [Eduardo](https://github.com/EduardoPEMA)
+ [César](https://github.com/hiromi00)
+ [Isaac](https://github.com/isaacfulcrum)

#### Acerca de este proyecto:

El proyecto final consiste en realizar un aplicación que aplique diferentes técnicas, frameworks y librerías aprendidas en clase; debe implementar Github, Docker, Kubernetes e Istio. 

El equipo decidió realizar una aplicación Ecommerce con un  backend realizado con [Loopback](https://loopback.io/) y un frontend con [React](https://es.reactjs.org/). 

#### Pasos de instalación:

Clonar el repositorio e ir a la carpeta del proyecto

`git clone https://github.com/hiromi00/checkoutCE.git`

`cd checkoutCE`

Realizar una copia de las variables de entorno que están dentro del archivo `.env.example`

`cp .env.example .env`

Dentro de la carpeta del proyecto correr el comando
`sudo docker-compose up -d --build`

La etiqueta `-d` corre el contenedor como un proceso de fondo y `--build` hará un build de las imágenes.

**Nota: Si cuentas con sistema operativo Windows es recomendable levantar el proyecto en una terminal linux**

Si todo fue exitoso el proyecto se mostrará de la siguiente manera en docker desktop
![docker](https://github.com/hiromi00/checkoutCE/blob/main/assets/containers.png?raw=true "Docker")

Primera versión del frontend

![react](https://github.com/hiromi00/checkoutCE/blob/main/assets/frontendv1.png?raw=true"React")

#### Datos técnicos:

- HTML 5
- Node.js
- DB: MySQL
- React