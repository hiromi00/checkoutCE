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

#### Semana #1:

Si todo fue exitoso el proyecto se mostrará de la siguiente manera en docker desktop
![docker](https://github.com/hiromi00/checkoutCE/blob/main/assets/containers.png?raw=true "Docker")

Primera versión del frontend

![react](https://github.com/hiromi00/checkoutCE/blob/main/assets/frontendv1.png?raw=true"React")

#### Semana #2:

Login de la aplicación

![react](https://github.com/hiromi00/checkoutCE/blob/main/assets/login.PNG?raw=true"Login")

SignUp de la aplicación

![react](https://github.com/hiromi00/checkoutCE/blob/main/assets/signup.PNG?raw=true"SignUp")

Pantalla principal

![react](https://github.com/hiromi00/checkoutCE/blob/main/assets/carrito.PNG?raw=true"Dashboard")

Pasos del checkout

![react](https://github.com/hiromi00/checkoutCE/blob/main/assets/checkout1.PNG?raw=true"Checkout")

![react](https://github.com/hiromi00/checkoutCE/blob/main/assets/checkout2.PNG?raw=true"Checkout")

![react](https://github.com/hiromi00/checkoutCE/blob/main/assets/checkout3.PNG?raw=true"Checkout")

![react](https://github.com/hiromi00/checkoutCE/blob/main/assets/checkout4.PNG?raw=true"Checkout")
#### Semana #3:

Actualmente el proyecto se conectó totalmente con el backend, recibiendo y desplegando data real, al igual que la autenticación del usuario

Signup de la aplicación

![react](https://github.com/hiromi00/checkoutCE/blob/main/assets/week%20%233/signup.PNG?raw=true"SignUp")

Login de la aplicacion

![react](https://github.com/hiromi00/checkoutCE/blob/main/assets/week%20%233/login.PNG?raw=true"Login")

Pantalla principal

![react](https://github.com/hiromi00/checkoutCE/blob/main/assets/week%20%233/dashboard.PNG?raw=true"Dashboard")

![react](https://github.com/hiromi00/checkoutCE/blob/main/assets/week%20%233/cartAdd.PNG?raw=true"Dashboard")

Carrito

![react](https://github.com/hiromi00/checkoutCE/blob/main/assets/week%20%233/shopCart.PNG?raw=true"Carrito")

Pasos del checkout

![react](https://github.com/hiromi00/checkoutCE/blob/main/assets/week%20%233/checkout1.PNG?raw=true"Checkout")

![react](https://github.com/hiromi00/checkoutCE/blob/main/assets/week%20%233/checkout2.PNG?raw=true"Checkout")

![react](https://github.com/hiromi00/checkoutCE/blob/main/assets/week%20%233/Checkout3.PNG?raw=true"Checkout")

![react](https://github.com/hiromi00/checkoutCE/blob/main/assets/week%20%233/pedido.PNG?raw=true"Checkout")

Al finalizar el pedido seremos redirigidos a nuestro carrito el cual se encontrará vacío.

![react](https://github.com/hiromi00/checkoutCE/blob/main/assets/week%20%233/emptyCart.PNG?raw=true"Carrito")

Especificaciones

![react](https://github.com/hiromi00/checkoutCE/blob/main/assets/week%20%233/specs.PNG?raw=true"Especificaciones")




#### Datos técnicos:

- HTML 5
- Node.js
- DB: MySQL
- React
