const express = require('express');
const helmet = require('helmet');
const https = require('https');
const fs = require('fs');
const path = require('path');
const blockchain = require('./blockchain'); 

const app = express();
const PORT = 3000;

//  Seguridad con Helmet
app.use(helmet());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Rutas
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/registro.html'));
});

app.post('/registrar', (req, res) => {
    console.log('Datos registrados:', req.body);
    
  
    const registro = {
        timestamp: new Date().toISOString(),
        usuario: req.body.usuario || 'Anónimo',
        email: req.body.email || 'Sin email',
        accion: 'registro'
    };
    
    blockchain.addRegistration(registro);
    
    res.redirect('/home');
});


app.get('/blockchain', (req, res) => {
    const chainData = blockchain.getChainData();
    const isValid = blockchain.isChainValid();
    
    res.json({
        cadena: chainData,
        longitud: chainData.length,
        valida: isValid,
        timestamp: new Date().toISOString()
    });
});


app.get('/verificar', (req, res) => {
    const isValid = blockchain.isChainValid();
    
    res.json({
        integridad: isValid ? '✅ CADENA VÁLIDA' : '❌ CADENA CORRUPTA',
        bloques: blockchain.chain.length,
        ultimoHash: blockchain.getLatestBlock().hash
    });
});


app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/home.html'));
});

//  CERTIFICADO HTTPS
const options = {
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.crt')
};

https.createServer(options, app).listen(PORT, () => {
    console.log(`🚀 Mi Tiendita HTTPS: https://localhost:${PORT}`);
    console.log('🔐 CERTIFICADO SSL ACTIVADO - Protocolo de seguridad implementado');
    console.log('⛓️  BLOCKCHAIN ACTIVADO - Principios de blockchain implementados');
});