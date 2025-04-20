FROM node:23-bookworm

ARG WORKDIR
ARG PORT
ARG USERNAME

RUN userdel -r node

# # -U: create user group with same name
# # -m: create user home
# # -s: set default user shell
RUN useradd -Ums /bin/bash ${USERNAME}

USER ${USERNAME}

WORKDIR ${WORKDIR}

COPY . .

RUN npm clean-install

ENV APP_PORT=${PORT}

EXPOSE ${PORT}

CMD [ "npm", "run", "dev" ]
