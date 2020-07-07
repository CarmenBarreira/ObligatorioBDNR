using Neo4j.Driver.V1;
using System.Web.Http;

namespace ObliBDNR
{
    public static class WebApiConfig
    {
        public static IDriver Neo4jDriver { get; private set; }

        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services
            config.EnableCors();
            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );


            var url = System.Configuration.ConfigurationManager.AppSettings["GraphDBUrl"];
            var username = System.Configuration.ConfigurationManager.AppSettings["GraphDBUser"];
            var password = System.Configuration.ConfigurationManager.AppSettings["GraphDBPassword"];
            var authToken = AuthTokens.None;

            if (!string.IsNullOrEmpty(password) && !string.IsNullOrEmpty(username))
                authToken = AuthTokens.Basic(username, password);


            Neo4jDriver = GraphDatabase.Driver(url, authToken);
        }
    }
}
