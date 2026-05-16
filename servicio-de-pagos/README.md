# Servicio de Procesamiento de Pagos (FastAPI)

Este microservicio simula el procesamiento de pagos. Recibe un monto y responde si el pago fue aprobado o rechazado (aleatorio: 80% aprobado, 20% rechazado).
  

## Requisitos

- Python 3.8 o superior
- pip

## Instalación y ejecución

1. **Navega a la carpeta del servicio:**

   ```sh
   cd servicio-de-pagos
   ```
  

2. **Crea un entorno virtual:**

   En Windows (PowerShell):

   ```sh
   python -m venv venv
   .\venv\Scripts\Activate
   ```

   En Mac/Linux:

   ```sh
   python3 -m venv venv
   source venv/bin/activate
   ```

3. **Instala las dependencias:**

   ```sh
   pip install fastapi uvicorn
   ```


4. **Ejecuta el servidor FastAPI:**

   ```sh
   uvicorn main:app --reload
   ```

  
5. **Prueba el endpoint:**
   Abre tu navegador en: [http://127.0.0.1:8000/](http://127.0.0.1:8000/) verás y esta respuesta si esta corriendo todo bien.
 ```Json
 {"message":"Welcome to the Payment Service!"}
 ```
## Notas
- Está integrado con el backend de node.js el cual lo usa, haciendo peticiones HTTP POST al endpoint `/process-payment`.