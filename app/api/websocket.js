const WebSocket = require('ws');

module.exports = (req, res) => {
  // 创建 WebSocket 服务器实例
  const wss = new WebSocket.Server({ noServer: true });

  // 建立连接
  wss.on('connection', (ws) => {
    console.log('WebSocket 连接已建立');

    // 监听消息事件
    ws.on('message', (data) => {
      console.log('收到消息：', data.toString());

      // 发送消息至客户端
      ws.send(`已收到消息：${data.toString()}`);
    });

    // 发送欢迎消息至客户端
    ws.send('欢迎进入 WebSocket 服务！');
  });

  // 判断是否为 HTTP 升级请求
  if (req.headers.upgrade === 'websocket') {
    // 升级请求
    res.writeHead(101, {
      'Connection': 'Upgrade',
      'Upgrade': 'websocket'
    });

    // 处理升级请求
    wss.handleUpgrade(req, req.socket, Buffer.alloc(0), (ws) => {
      wss.emit('connection', ws, req);
    });
  }
}
