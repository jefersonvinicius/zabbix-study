service mysql start
sleep 5

mysql -uroot -proot --execute="create database zabbix character set utf8mb4 collate utf8mb4_bin;"
mysql -uroot -proot --execute="create user zabbix@localhost identified by 'password';"
mysql -uroot -proot --execute="create database zabbix character set utf8mb4 collate utf8mb4_bin;"
mysql -uroot -proot --execute="grant all privileges on zabbix.* to zabbix@localhost;"
zcat /usr/share/doc/zabbix-sql-scripts/mysql/server.sql.gz | mysql -uzabbix -pzabbix zabbix

service zabbix-server restart 
service zabbix-agent restart
service apache2 restart