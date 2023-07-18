# Verwenden eines Node.js-Images als Basis
FROM node

# Arbeitsverzeichnis im Container erstellen
WORKDIR /app

# Paketabhängigkeiten kopieren und installieren
COPY package.json package-lock.json /app/
RUN npm install

# Anwendungscode kopieren
COPY . /app/

# Container-Port freigeben
EXPOSE 3000

# Anwendungsstartbefehl
CMD [ "npm", "start" ]
