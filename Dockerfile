FROM yuxidevops/lce_back
COPY package.json /src/package.json
RUN cd /src; npm install --production
COPY . /src
WORKDIR /src
EXPOSE  3000

CMD ["npm", "start"]