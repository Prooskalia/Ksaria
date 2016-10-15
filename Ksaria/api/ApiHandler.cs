using System;
using System.Net;
using System.Web;

namespace Ksaria
{
    public class ApiHandler : IHttpHandler
    {
        public bool IsReusable => false;


        public void ProcessRequest(HttpContext context)
        {
            var response = context.Response;

            try
            {
                var request = new ApiRequest(context.Request);

            }
            catch (Exception exception)
            {
                response.StatusCode = (int)HttpStatusCode.InternalServerError;
                response.Status = $"Internal server error: {exception.Message}";
            }
        }
    }
}