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
    public class ArchivoController : ApiController
    {

        // GET api/values/ todas los archivos
        public IHttpActionResult Get()
        {
            return Ok(Newtonsoft.Json.JsonConvert.SerializeObject(GetSetNeo4j.GetArchivos()));
        }

        // GET api/values/Invocaciones
        public IHttpActionResult Get(string nombreFuncion, string nombreArchivoFuncion)
        {
            return Ok(Newtonsoft.Json.JsonConvert.SerializeObject(GetSetNeo4j.GetInvocaciones(nombreFuncion,nombreArchivoFuncion)));
        }

        // POST api/de archivo
        public IHttpActionResult Post(string nombre)
        {
            GetSetNeo4j.SetArchivo(nombre);
            return Ok();
        }

        // GET api/de archivo
        public IHttpActionResult Get(string correccionesdeultimahora)
        {
            return Ok(Newtonsoft.Json.JsonConvert.SerializeObject(GetSetNeo4j.GetInvocaciones()));
        }
        //POST api/ de relaciones
        public IHttpActionResult Post(string nombreFuncion, string nombreArchivoFuncion, [FromBody]Invocacion invocacion)
        {
            GetSetNeo4j.SetRelacion(invocacion,nombreFuncion,nombreArchivoFuncion);
            return Ok();
        }        
    }
}
