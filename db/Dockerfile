FROM mysql/mysql-server:8.0

ARG WORKDIR

# all .sql and .sh files inside /docker-entrypoint-initdb.d will be executed
# https://hub.docker.com/_/mysql
COPY init.sh /docker-entrypoint-initdb.d

WORKDIR ${WORKDIR}

COPY . .

ENV WORKDIR=${WORKDIR}
