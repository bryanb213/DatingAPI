using Microsoft.AspNetCore.Http;

namespace DatingAPI.Helpers
{
    public static class Extensions
    {
        public static void AddApplicationError(this HttpResponse response, string msg)
        {
            //when we send error there will be a new header and msg is holding error
            response.Headers.Add("AppError", msg);
            //these 2 allow the error to be displayed and make it pass CORS
            response.Headers.Add("Access-Control-Expose-Headers", "AppError");
            response.Headers.Add("Access-Control-Origin", "*");
        }
    }
}