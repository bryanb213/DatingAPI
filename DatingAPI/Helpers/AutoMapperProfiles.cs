using System.Linq;
using AutoMapper;
using DatingAPI.Dtos;
using DatingAPI.Helpers;
using DatingApp.API.Dtos;
using DatingApp.API.Models;

namespace DatingApp.API.Helpers
{
    // maps data to uuser
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            //connect user and the dto u want  but only the ones that connect (not age and ph  otoUrl)
            CreateMap<User, UserForListDto>()
            // for a specific member of the UserForListDto  we are finding the photo URL property
                .ForMember(dest => dest.PhotoUrl, opt => 
                // and writing the information of where to get that property from
                    opt.MapFrom(src => src.Photos.FirstOrDefault( p => p.IsMain).Url))
                //for age
                .ForMember(dest => dest.Age, opt => 
                    opt.MapFrom(src => src.DateOfBirth.CalculateAge()));

            CreateMap<User, UserForDetailDto>()
                .ForMember(dest => dest.PhotoUrl, opt => 
                    opt.MapFrom(src => src.Photos.FirstOrDefault( p => p.IsMain).Url))
                .ForMember(dest => dest.Age, opt => 
                    opt.MapFrom(src => src.DateOfBirth.CalculateAge()));

            CreateMap<Photo, PhotoForDetailedDto>();

            // backwards to send data to user
            CreateMap<UserToUpdateDto, User>();

            //for photos
            CreateMap<Photo, PhotoForReturnDto>();
            CreateMap<PhotoForCreationDto, Photo>();
        }
    }
}