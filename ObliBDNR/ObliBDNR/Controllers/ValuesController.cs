using ObliBDNR.Codigo;
using OBliBDNR.Codigo;
using System.Web.Http;
using System.Web.Http.Cors;

namespace OBliBDNR.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class ValuesController : ApiController
    {

        // GET api/values/5
        public IHttpActionResult Get(string username)
        {
            return Ok(GetSetRedis.GetData(username));
        }

        // POST api/values
        public IHttpActionResult Post(string username, [FromBody] Accion accion)
        {
            GetSetRedis.SaveData(username, accion);
            return Ok();
        }
    }
}
