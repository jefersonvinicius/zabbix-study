const axios = require('axios').default;

const zabbixAPI = axios.create({
  baseURL: 'http://172.19.0.3/zabbix',
  headers: {
    'Content-Type': 'application/json-rpc',
  },
  timeout: 4000,
});

const Zabbix = {
  async auth() {
    const response = await zabbixAPI.post('/api_jsonrpc.php', {
      jsonrpc: '2.0',
      method: 'user.login',
      params: {
        user: 'Admin',
        password: 'zabbix',
      },
      id: 1,
      auth: null,
    });
    return response.data.result;
  },
  async hosts({ token }) {
    const response = await zabbixAPI.post('/api_jsonrpc.php', {
      jsonrpc: '2.0',
      method: 'host.get',
      params: {
        output: ['hostid', 'host'],
        selectInterfaces: ['interfaceid', 'ip'],
      },
      id: 2,
      auth: token,
    });
    return response.data.result;
  },
  async items({ token, hostsIds }) {
    const response = await zabbixAPI.post('/api_jsonrpc.php', {
      jsonrpc: '2.0',
      method: 'item.get',
      params: {
        hostids: hostsIds,
      },
      id: 3,
      auth: token,
    });
    if (response.data.error) throw new Error(`${response.data.error.message} - ${response.data.error.data}`);
    return response.data.result;
  },
  async itemData({ token, itemId }) {
    const response = await zabbixAPI.post('/api_jsonrpc.php', {
      jsonrpc: '2.0',
      method: 'history.get',
      params: {
        output: 'extend',
        history: 0,
        itemids: itemId,
        sortfield: 'clock',
        sortorder: 'DESC',
        limit: 30,
      },
      id: 4,
      auth: token,
    });
    if (response.data.error) throw new Error(`${response.data.error.message} - ${response.data.error.data}`);
    return response.data.result;
  },
};

module.exports = { Zabbix };
