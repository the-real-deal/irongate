FROM node:23-bookworm

ARG WORKDIR
ARG USER
ARG APP_PORT

RUN userdel -r node

# # -U: create user group with same name
# # -m: create user home
# # -s: set default user shell
RUN useradd -Ums /bin/bash ${USER}

USER ${USER}

WORKDIR ${WORKDIR}

COPY . .

RUN npm clean-install --verbose

EXPOSE ${APP_PORT}

CMD [ "npm", "run", "dev" ]
