# 📋 Mi Tiendita - Proyecto de Seguridad Informática

## Integrantes:
- Alexia Sanchez Vazquez
- Danna Michelle Cruz Vazquez

## 🎯 Descripción del Proyecto
Sistema web para gestión de pequeñas tiendas que implementa protocolos de seguridad avanzados, firmas digitales y principios de blockchain.

## ✅ Requisitos Implementados

### 1. **Protocolos de Seguridad** 🔒
- **HTTPS/SSL**: Servidor configurado con certificados digitales
- **Helmet.js**: Protección de headers HTTP
- **Validación de formularios**: Client-side y server-side
- **Cifrado de comunicaciones**: TLS/SSL para todas las transacciones

### 2. **Firmas y Certificados Digitales** 📜
- **Certificado SSL**: Autofirmado para desarrollo
- **Firmas digitales**: Hash SHA256 en blockchain
- **Criptografía asimétrica**: Implementada en certificados HTTPS
- **Integridad de datos**: Verificación mediante hashes criptográficos

### 3. **Principios de Blockchain** ⛓️
- **Cadena de bloques inmutable**: Estructura linked-list con hashes
- **Proof-of-Work**: Sistema de minería con dificultad ajustable
- **Consenso distribuido**: Validación de integridad de la cadena
- **Timestamping**: Registro temporal de transacciones
- **Hash criptográfico**: SHA256 para garantizar integridad

## 🏗️ Arquitectura del Sistema

### Frontend
- **HTML5/CSS3**: Interfaces responsivas
- **Bootstrap 5**: Framework de UI
- **Validación HTML5**: Formularios seguros

### Backend
- **Node.js + Express**: Servidor web
- **Helmet.js**: Middleware de seguridad
- **HTTPS**: Protocolo seguro
- **Blockchain custom**: Implementación educativa

### Blockchain
- **Clase Block**: Bloques individuales con timestamp y hash
- **Clase Blockchain**: Gestión de la cadena completa
- **Minería**: Proof-of-Work con nonce
- **Validación**: Verificación de integridad de cadena

## 🚀 Instalación y Configuración

### Prerrequisitos
```bash
# Instalar Node.js y npm
# Instalar mkcert para certificados SSL
npm install -g mkcert
```

### 1. Generar Certificados SSL
```bash
# Crear Autoridad Certificadora
mkcert create-ca

# Crear certificado para desarrollo
mkcert create-cert

# Renombrar archivos generados
ren cert.crt server.crt
ren cert.key server.key
```

### 2. Instalar Dependencias
```bash
npm install express helmet
```

### 3. Estructura de Archivos
```
mi-tiendita/
├── app.js
├── blockchain.js
├── server.crt
├── server.key
├── views/
│   ├── registro.html
│   └── home.html
├── public/
│   ├── js/
│   └── img/
└── package.json
```

### 4. Ejecutar la Aplicación
```bash
node app.js
```

## 🔧 Endpoints Disponibles

- `GET /` - Formulario de registro
- `POST /registrar` - Registrar nueva tienda
- `GET /home` - Dashboard principal
- `GET /blockchain` - Ver cadena completa
- `GET /verificar` - Verificar integridad blockchain


## 🎓 Propósito Educativo
Este proyecto demuestra la integración de:
- Protocolos de seguridad web
- Criptografía aplicada
- Principios de blockchain
- Desarrollo full-stack seguro

