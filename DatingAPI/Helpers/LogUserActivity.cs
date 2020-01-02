using System;
using System.Security.Claims;
using System.Threading.Tasks;
using DatingAPI.Data;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.DependencyInjection;

namespace DatingAPI.Helpers
{
    public class LogUserActivity : IAsyncActionFilter
    {
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            //access to http context
            var resultContext = await next();

            //get user id from token
            var userId = int.Parse(resultContext.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value);

            //get instance of repo
            var repo = resultContext.HttpContext.RequestServices.GetService<IDatingRepository>();

            //get user
            var user = await repo.GetUser(userId);

            //update user date
            user.LastActive = DateTime.Now;
            //save
            await repo.SaveAll();
        }
    }
}