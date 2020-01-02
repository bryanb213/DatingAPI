using System.Collections.Generic;
using System.Threading.Tasks;
using DatingAPI.Helpers;
using DatingApp.API.Models;

namespace DatingAPI.Data
{
    public interface IDatingRepository
    {
        // create one method and specify the type (which is T for task) to dave to database
        void Add<T>(T entity) where T: class;
        void Delete<T>(T entity) where T: class;
        Task<bool> SaveAll();
        Task<PagedList<User>> GetUsers(UserParams userParams);
        Task<User> GetUser(int id);
        Task<Photo> GetPhoto(int id);
        Task<Photo> GetMainPhotoForUser(int userId);
    }
}