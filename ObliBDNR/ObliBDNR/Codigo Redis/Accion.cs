using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ObliBDNR.Codigo
{

    public class Accion
    {
        public string NombreRepo { get; set; }
        public string RutaRepo { get; set; }
        public string TipoRepo { get; set; }
        public string TipoAccion { get; set; }
        public string Detalle { get; set; }
        public DateTimeOffset Fecha { get; set; }

        public Accion() {
            Fecha = DateTimeOffset.Now;
        }
    }
}