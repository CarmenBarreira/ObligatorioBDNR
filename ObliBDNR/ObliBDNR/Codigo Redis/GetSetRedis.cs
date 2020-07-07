using ObliBDNR.Codigo;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;

namespace OBliBDNR.Codigo
{
    public class GetSetRedis
    {
        public static string GetData(string username)
        {
            var cache = RedisConnectorHelper.Connection.GetDatabase();
            var accionesRedis = cache.ListRange(username,0,-1);
            List<Object> acciones = new List<Object>();
            foreach ( var j in accionesRedis)
            {
                var a = Newtonsoft.Json.JsonConvert.DeserializeObject(j.ToString());
                acciones.Add(a);
            }
            return Newtonsoft.Json.JsonConvert.SerializeObject(acciones);
        }

        public static void SaveData(string username, Accion accion)
        {
            var json = Newtonsoft.Json.JsonConvert.SerializeObject(accion);
            var cache = RedisConnectorHelper.Connection.GetDatabase();
            cache.ListLeftPush(username, json);
        }
    }
}