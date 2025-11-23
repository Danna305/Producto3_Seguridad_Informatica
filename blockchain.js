const crypto = require('crypto');

class Block {
    constructor(timestamp, data, previousHash = '') {
        this.timestamp = timestamp;
        this.data = data; // Datos del registro
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash() {
        return crypto
            .createHash('sha256')
            .update(
                this.timestamp +
                JSON.stringify(this.data) +
                this.previousHash +
                this.nonce
            )
            .digest('hex');
    }

    mineBlock(difficulty) {
        while (
            this.hash.substring(0, difficulty) !==
            Array(difficulty + 1).join('0')
        ) {
            this.nonce++;
            this.hash = this.calculateHash();
        }
        console.log(`🔨 Bloque minado: ${this.hash}`);
    }
}

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2;
        this.pendingRegistrations = [];
        
        // ✅ AGREGAR BLOQUE INICIAL AUTOMÁTICAMENTE
        this.addRegistration({
            timestamp: new Date().toISOString(),
            usuario: 'Sistema',
            email: 'sistema@mitiendita.com', 
            accion: 'inicializacion'
        });
    }

    createGenesisBlock() {
        return new Block('2024-01-01', 'Bloque Génesis', '0');
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addRegistration(data) {
        console.log('📝 Agregando registro a blockchain:', data);
        this.pendingRegistrations.push(data);
        
        // ✅ CAMBIO: Minar inmediatamente después de cada registro
        this.minePendingRegistrations();
        
        // ❌ ELIMINAR esto:
        // if (this.pendingRegistrations.length >= 3) {
        //     this.minePendingRegistrations();
        // }
    }

    minePendingRegistrations() {
        if (this.pendingRegistrations.length === 0) return;

        const block = new Block(
            Date.now(),
            this.pendingRegistrations,
            this.getLatestBlock().hash
        );

        console.log('⛏️ Minando bloque...');
        block.mineBlock(this.difficulty);

        this.chain.push(block);
        console.log(`✅ Bloque #${this.chain.length} agregado a la cadena`);
        
        // Limpiar registros pendientes
        this.pendingRegistrations = [];
    }

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    }

    getChainData() {
        return this.chain.map(block => ({
            timestamp: block.timestamp,
            data: block.data,
            hash: block.hash,
            previousHash: block.previousHash
        }));
    }
}

// Crear instancia global de blockchain
const myBlockchain = new Blockchain();

module.exports = myBlockchain;