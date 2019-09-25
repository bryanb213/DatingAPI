using System;
using System.Collections.Generic;
using DatingApp.API.Dtos;
using DatingApp.API.Models;

namespace DatingAPI.Dtos
{
    public class UserForDetailDto
    {
        public int Id { get; set; }
        public string Username  {get; set;}
        public string Gender {get;set;}
        public int Age { get; set; }
        public string KnownAs { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime LastActive { get; set; }
        public string Introduction { get; set; }
        public string LookingFor { get; set; }
        public string Interests { get; set; }
        public string City { get; set; }
        public string County { get; set; }
        public string PhotoUrl { get; set; }
        public ICollection <PhotoForDetailedDto> Photos { get; set; }
    }
}