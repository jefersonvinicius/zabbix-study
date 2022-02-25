#!/bin/sh

export MYSQL_PWD=root
while true;
do  
    echo "Waiting mysql server become online"
    sleep 1
    mysql -h mysql-server -P 3306 -uroot --execute="show databases" > /dev/null && break
done
echo "Mysql server is available!"

sleep 4

mysql -h mysql-server -P 3306 -uroot -proot --execute="create database if not exists zabbix character set utf8mb4 collate utf8mb4_bin;"
mysql -h mysql-server -P 3306 -uroot -proot --execute="create user if not exists zabbix@172.19.0.3 identified by '${DB_PASSWORD}';"
mysql -h mysql-server -P 3306 -uroot -proot --execute="grant all privileges on zabbix.* to zabbix@172.19.0.3;"
zcat /usr/share/doc/zabbix-sql-scripts/mysql/server.sql.gz | mysql -h mysql-server -P 3306 -uzabbix -pzabbix zabbix

service zabbix-server restart 
service zabbix-agent restart
service apache2 restart