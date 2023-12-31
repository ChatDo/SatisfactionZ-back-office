FROM node:18

WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 4173

CMD npm run dev
# CMD npm run build
# CMD npm run preview
