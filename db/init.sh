for script in "schema.sql" "data.sql"; do
    mysql -u root -p${MYSQL_ROOT_PASSWORD} < ${WORKDIR}/init/${script}
done