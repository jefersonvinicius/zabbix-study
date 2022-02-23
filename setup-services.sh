service mysql start
sleep 5

mysql -uroot -proot --execute="create database if not exists zabbix character set utf8mb4 collate utf8mb4_bin;"
mysql -uroot -proot --execute="create user if not exists zabbix@localhost identified by '${DB_PASSWORD}';"
mysql -uroot -proot --execute="grant all privileges on zabbix.* to zabbix@localhost;"
zcat /usr/share/doc/zabbix-sql-scripts/mysql/server.sql.gz | mysql -uzabbix -pzabbix zabbix

service zabbix-server restart 
service zabbix-agent restart
service apache2 restart