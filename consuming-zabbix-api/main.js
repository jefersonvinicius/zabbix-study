const { plotItemGraphToImageFile } = require('./libs/graphs');
const { Zabbix } = require('./libs/zabbix-api');

async function main() {
  try {
    const token = await Zabbix.auth();
    const hosts = await Zabbix.hosts({ token });
    console.log('Hosts:');
    console.table(hosts.map((h) => ({ id: h.hostid, name: h.host })));

    const targetHost = 'New Host';
    const items = await Zabbix.items({ token, hostsIds: hosts.find((h) => h.host === targetHost) });
    console.log(`${targetHost} items:`);
    console.table(items.map((item) => ({ id: item.itemid, name: item.name })));

    const targetItem = 'CPU load';
    const itemData = await Zabbix.itemData({ token, itemId: items.find((item) => item.name === targetItem).itemid });
    await plotItemGraphToImageFile({ itemData, finalFilename: `chart.png` });
    console.log(`Chart plotted at ${__dirname}/chart.png`);
  } catch (error) {
    console.log(error);
  }
}

main();
