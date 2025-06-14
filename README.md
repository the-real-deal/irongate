# Istruzioni per l'esecuzione

Esistono due modi diversi per avviare l'applicazione, automaticamente tramite container o in maniera manuale.

In entrambi i casi, l'applicazione sarà pronta quando verrà mostrato in console il messagggio `Server running on ...`.

Appena pronta, aprire un browser sulla pagina specificata (default: http://localhost:3000).

# Esecuzione tramite docker

Requisiti: 
- docker
- docker compose

L'applicativo è stato predisposto per un'esecuzione istantanea tramite docker.
Da dentro la cartella contenente l'intero progetto, eseguire

```
docker compose up
```

# Esecuzione manuale

Requisiti
- mysql 8 con relativo client
- nodejs
- npm

Avviare MySQL ed eseguire tramite il client il file `db/init.sql` per creare l'intero database e popolarlo con dati d'esempio.

> [!IMPORTANT]
> N.B: è necessario che il client MySQL utilizzato supporti l'istruzione `DELIMITER`, utilizzata per la creazione di procedure e trigger multi-istruzione.

Una volta che il database è pronto, partendo da dentro la cartella contenente l'intero progetto

1. Spostarsi nella cartella contenente l'applicazione web
```
cd app
```

2. Installare le dipendenze
```
npm ci
```

3. Avviare l'applicazione
```
npm run dev
```

In un solo blocco:
```
cd app
npm ci
npm run dev
```
