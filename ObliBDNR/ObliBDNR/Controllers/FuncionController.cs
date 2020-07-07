using ObliBDNR.Codigo;
using ObliBDNR.Codigo_Neo4j;
using OBliBDNR.Codigo;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace OBliBDNR.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class FuncionController : ApiController
    {

        // GET api/values/ todas las funciones
        public IHttpActionResult Get()
        {
            return Ok(Newtonsoft.Json.JsonConvert.SerializeObject(GetSetNeo4j.GetFunciones()));
        }

        // GET api/values/ todas las funciones de un archivo
        public IHttpActionResult Get(string archivo)
        {
            return Ok(Newtonsoft.Json.JsonConvert.SerializeObject(GetSetNeo4j.GetFuncionesDeArchivo(archivo)));
        }

        // GET api/values/ dar F12
        public IHttpActionResult Get(string nombreArchivo,string linea, string columna)
        {
            return Ok(Newtonsoft.Json.JsonConvert.SerializeObject(GetSetNeo4j.GetDefinidoEn(nombreArchivo,linea,columna)));
        }

        // POST api/values
        public IHttpActionResult Post([FromBody] Funcion funcion)
        {
            GetSetNeo4j.SetFuncion(funcion);
            return Ok();
        }
    }
}
