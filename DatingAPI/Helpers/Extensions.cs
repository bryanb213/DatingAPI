using System;
using Microsoft.AspNetCore.Http;

namespace DatingAPI.Helpers
{
    public static class Extensions
    {
        public static void AddApplicationError(this HttpResponse response, string message)
        {
            //when we send error there will be a new header and msg is holding error
            response.Headers.Add("Application-Error",message);
            //these 2 allow the error to be displayed and make it pass CORS
            response.Headers.Add("Access-Control-Expose-Headers", "Application-Error");
            response.Headers.Add("Access-Control-Origin", "*");
        }


//for automapper
        public static int CalculateAge(this DateTime theDateTime)
        {
            var age = DateTime.Today.Year - theDateTime.Year;
            if(theDateTime.AddYears(age) > DateTime.Today)
            {
                age--;
            }

            return age;
        }
    }
}