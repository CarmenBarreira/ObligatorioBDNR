using Neo4j.Driver.V1;
using System.Collections.Generic;

namespace ObliBDNR.Codigo_Neo4j
{
    public class GetSetNeo4j
    {
        public static void SetArchivo(string nombre)
        {
            string query = "CREATE(a: Archivo{ nombre: \"" + nombre + "\"})";
            using (var session = WebApiConfig.Neo4jDriver.Session())
            {
                session.Run(query);
            }
        }

        public static void SetFuncion(Funcion funcion)
        {
            string query = "MATCH (a:Archivo)" +
                "WHERE a.nombre = \"" + funcion.NombreArchivo + "\"" +
                "CREATE(f: Funcion{ nombre: \"" + funcion.NombreFuncion + "\"}), ((f)-[:DefinidaEn {linea:" + funcion.Linea + ",col:" + funcion.Columna + "}]->(a));";
            using (var session = WebApiConfig.Neo4jDriver.Session())
            {
                session.Run(query);
            }
        }
        public static void SetRelacion(Invocacion invocacion, string nombreFuncion, string nombreArchivoFuncion)
        {
            string query = "MATCH (a:Archivo)" +
                "WHERE a.nombre = \"" + invocacion.NombreArchivo + "\"" +
                "MATCH (f:Funcion)-[:DefinidaEn]->(b:Archivo)" +
                "WHERE f.nombre = \"" + nombreFuncion + "\" AND b.nombre = \"" + nombreArchivoFuncion + "\"" +
                "CREATE ((f)-[:EsInvocadoPor {linea:" + invocacion.Linea + ",col:" + invocacion.Columna + "}]->(a)), ((a)-[:DefinidoPor{linea:" + invocacion.Linea + ",col:" + invocacion.Columna + "}]->(f));";
            using (var session = WebApiConfig.Neo4jDriver.Session())
            {
                session.Run(query);
            }
        }

        public static List<Invocacion> GetInvocaciones(string nombreFuncion, string nombreArchivo)
        {
            List < Invocacion > ret= new List<Invocacion>();
            string query = "MATCH (f:Funcion)-[:DefinidaEn]->(a:Archivo)" +
                "WHERE f.nombre = \"" + nombreFuncion + "\" AND a.nombre = \"" + nombreArchivo + "\"" +
                "MATCH ((f)-[i:EsInvocadoPor]->(b))" +
                "return b.nombre, i.col, i.linea;";
            using (var session = WebApiConfig.Neo4jDriver.Session())
            {
                var results = session.Run(query);
                foreach (var a in results)
                {
                    Invocacion i = new Invocacion() { Columna= a["i.col"].As<string>(), Linea = a["i.linea"].As<string>(),NombreArchivo = a["b.nombre"].As<string>()};
                    ret.Add(i);
                }
                return ret;
            }
        }
        public static List<Funcion> GetDefinidoEn(string nombreArchivo, string linea, string columna)
        {
            List<Funcion> ret = new List<Funcion>();
            string query = "MATCH (a:Archivo)-[d:DefinidoPor]->(f:Funcion)-[da:DefinidaEn]->(af:Archivo) "+
                "where a.nombre=\""+nombreArchivo + "\" and d.col= "+columna+" and d.linea="+linea+
                " return f.nombre,af.nombre,da.col,da.linea;";
            using (var session = WebApiConfig.Neo4jDriver.Session())
            {
                var results = session.Run(query);
                foreach (var a in results)
                {
                    Funcion f = new Funcion() { NombreFuncion = a["f.nombre"].As<string>(), NombreArchivo = a["af.nombre"].As<string>(), Linea = a["da.linea"].As<string>(),Columna= a["da.col"].As<string>() };
                    ret.Add(f);
                }
                return ret;
            }
        }

        public static List<string> GetArchivos()
        {
            List<string> ret = new List<string>();
            string query = "MATCH (a:Archivo)" +
                 "return a.nombre order by a.nombre";
            using (var session = WebApiConfig.Neo4jDriver.Session())
            {
                var results = session.Run(query);
                foreach (var a in results)
                {
                    ret.Add(a["a.nombre"].As<string>());
                }

                return ret;
            }
        }

        public static List<Funcion> GetFunciones()
        {
            List<Funcion> ret= new List<Funcion>();

            string query = "MATCH (f:Funcion)-[d:DefinidaEn]->(a:Archivo)"+
                "return f.nombre, a.nombre, d.linea, d.col order by f.nombre";
            using (var session = WebApiConfig.Neo4jDriver.Session())
            {
                var results = session.Run(query);
                foreach (var a in results)
                {
                    Funcion f = new Funcion() { Columna= a["d.col"].As<string>(), Linea= a["d.linea"].As<string>(), NombreArchivo= a["a.nombre"].As<string>(), NombreFuncion= a["f.nombre"].As<string>() };
                    ret.Add(f);
                }
                return ret;
            }
        }

        public static List<string> GetFuncionesDeArchivo(string nombreArchivo)
        {
            List<string> ret = new List<string>();

            string query = "MATCH (f:Funcion)-[d:DefinidaEn]->(a:Archivo)" +
                "WHERE a.nombre= \"" + nombreArchivo + "\"" +
                "return f.nombre;";
            using (var session = WebApiConfig.Neo4jDriver.Session())
            {
                var results = session.Run(query);
                foreach (var a in results)
                {
                    ret.Add(a["f.nombre"].As<string>());
                }
                return ret;
            }
        }

        public static List<Invocacion> GetInvocaciones()
        {
            List<Invocacion> ret = new List<Invocacion>();
            string query =
                "MATCH ((f:Funcion)-[i:EsInvocadoPor]->(a:Archivo))" +
                "return a.nombre, i.col, i.linea order by a.nombre;";
            using (var session = WebApiConfig.Neo4jDriver.Session())
            {
                var results = session.Run(query);
                foreach (var a in results)
                {
                    Invocacion i = new Invocacion() { Columna = a["i.col"].As<string>(), Linea = a["i.linea"].As<string>(), NombreArchivo = a["a.nombre"].As<string>() };
                    ret.Add(i);
                }
                return ret;
            }
        }
    }
}