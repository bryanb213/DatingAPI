using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using DatingAPI.Data;
using DatingAPI.Dtos;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace DatingAPI.Controllers
{

    [Route("api/[controller")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _repo;
        private readonly IConfiguration _config;
        public AuthController(IAuthRepository repo, IConfiguration config)
        {
            _repo = repo;
            _config = config;
        }

        [HttpPost("register")] 
        public async Task<IActionResult> Register(UserForRegisterDto userForRegisterDto)
        {
            //validate request
            // if(!ModelState.IsValid)
            // {
            //     return BadRequest(ModelState);
            // }

            userForRegisterDto.Username = userForRegisterDto.Username.ToLower();
            if(await _repo.UserExist(userForRegisterDto.Username))
                return BadRequest("Username already exist");


            var userToCreate = new User
            {
                Username = userForRegisterDto.Username
            };

            var createdUser = await _repo.Register(userToCreate, userForRegisterDto.Password);

            return StatusCode(201);
        }
        [HttpPost("login")]
        public async Task<IActionResult> Login(UserForLoginDto userForLoginDto)
        {
            //check if user exist while passing in username and password
            var userFromRepo = await _repo.Login(userForLoginDto.Username.ToLower(), userForLoginDto.Password);

            if(userFromRepo == null)
                return Unauthorized();

            //add token and give it info by Claims give it id and username
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, userFromRepo.Id.ToString()),
                new Claim(ClaimTypes.Name, userFromRepo.Username)
            };

            //key to sign token
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.GetSection("AppSettings:Token").Value));

            //make signing credentials pass in key to  hash it
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            //make security token descriptor which contains Claims, expiring date and sign-in credentials
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds
            };

            //make token handler
            var tokenHandler = new JwtSecurityTokenHandler();

            //make token and pass in descriptor
            var token = tokenHandler.CreateToken(tokenDescriptor);

            //return Ok response with token
            return Ok( new { token = tokenHandler.WriteToken(token)});


        }
    }
}