#!/usr/bin/python
import json
from datetime import datetime

# import psycopgy2

# conn = psycopgy2.connect(database="chirpstack_as_events", user="chirpstack_as_events",
#                          password="dbpassword", host="192.168.43.82", port="5432")


def convertDict(Object):
    result = {}
    for key, value in Object.items():
        if type(value) == type({}):
            result[key] = convertDict(value)
        elif type(value) == datetime:
            result[key] = value.timestamp()
        elif type(value) == type([]):
            result[key] = convertList(value)
        else:
            result[key] = value
    return result


def convertList(Object):
    result = []
    for value in Object:
        print(type(value))
        if type(value) == type({}):
            result.append(convertDict(value))
        elif type(value) == datetime:
            result.append(value.timestamp())
        elif type(value) == type([]):
            result.append(convertList(value))
        else:
            result.append(value)
    return result


mydict = {'key': 124, "key2": "vet", "time": datetime.now()}
mylist = [[1, 2, 3, datetime.now()], 2, mydict, 5, datetime.now()]
print(convertList(mylist))
print(convertDict(mydict))
#  "select id,received_at,dev_eui,device_name,application_id,application_name,frequency,dr,adr,f_cnt,f_port,tags,data,rx_info,object from device_up"
keys = ['id', 'received_at', 'dev_eui', 'device_name', 'application_id', 'application_name',
        'frequency', 'dr', 'adr', 'f_cnt', 'f_port', 'tags', 'data', 'rx_info', 'object']
for row in rows:
    myobj = {}
    for i, key in enumerate(keys):
        if type(i) == datetime:
            myobj[key] = i.datetime
        elif type(i) == dict:
            for key, value in i:
