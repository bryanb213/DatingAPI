using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DatingAPI.Helpers;
using DatingApp.API.Data;
using DatingApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace DatingAPI.Data
{
    public class DatingRepository : IDatingRepository
    {
        private readonly DataContext _context;
        public DatingRepository(DataContext context)
        {
            _context = context;
        }


        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<Photo> GetMainPhotoForUser(int userId)
        {
            return await _context.Photos.Where(u => u.UserId == userId).FirstOrDefaultAsync(p => p.IsMain);
        }

        public async Task<Photo> GetPhoto(int id)
        {
            var photo = await _context.Photos.FirstOrDefaultAsync(u => u.Id == id);

            return photo;
        }

        public async Task<User> GetUser(int id)
        {
            //will not get photots so include them with Include()
            //var user = await _context.Users.Include(p => p.Photos).FirstOrDefaultAsync(u => u.Id == id);
                        var user = await this._context
                .Users
                .Include(u => u.Photos)
                .SingleOrDefaultAsync(u=> u.Id == id);
            
            return user;


            //return user;
        }

        public async Task<PagedList<User>> GetUsers(UserParams userParams)
        {
            var users =  _context.Users.Include(p => p.Photos).AsQueryable();

            return await PagedList<User>.CreateAsync(users, userParams.PageNumber, userParams.PageSize);
        }

        public async Task<bool> SaveAll()
        {
            //This method is set to bool so if it is greater than zero it will return true which will also notice how many changes
            return await _context.SaveChangesAsync() > 0;
        }
    }
}