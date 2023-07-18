# Verwende ein Node.js-Image als Basis
FROM node:14-alpine

# Setze das Arbeitsverzeichnis auf /app
WORKDIR /app

# Kopiere package.json und package-lock.json in das Arbeitsverzeichnis
COPY package.json package-lock.json /app/

# Installiere Abhängigkeiten
RUN npm install
RUN npm install pug

# Kopiere den restlichen Projektcode in das Arbeitsverzeichnis
COPY . /app/

# Baue das Frontend
RUN npm run build

# Setze den Befehl zum Starten des Frontends
CMD ["npm", "start"]
