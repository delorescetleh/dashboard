# dashboard

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```
### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
 
# dashboad
**Dashboard是對應針對 Chirpstack Events 的延伸作為資料展示網站**

## 開發組件
+ 前端框架: Vue.js
+ 後端語言: Python 
+ 資料庫: PostgreSQL

> Chirpstack 專案是由 Orne Brocaar 發起，專案為實作LoRaWAN網路伺服器群。 https://chirpstack.io 

## 資料格式
參數:deviceName
api = `http://192.168.43.82:8082?deviceName=${deviceName}`
### 由DataBase 取得以下的資料
data:{'upData':[{
          'received_at':String, //timestamp,
          'f_cnt': Double,
          'object':Object, //jsonb
      },...],
      'status':{
          'received_at':String, //timestamp
          'margin':Int, 
          'batteryLevel':float
      },
      'join':{
          'received_at':String, 
          'dev_eui':String, 
          'application_id':Int, 
          'application_name':String, 
      },
      'error':[{
          'received_at': String,
          'type': String,
          'error': String,
          'f_cnt': Double,
      },...]
}
# test
