using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class AccountController(DataContext context) : BaseApiController
    {
        [HttpPost("register")] // api/account/register
        public async Task<ActionResult<AppUser>> Register(string username, string password) // we want to receive the params as objects
        {
            using var hmac = new HMACSHA512(); // using means it will dispose of the object after it's done

            var user = new AppUser
            {
                Username = username,
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password)), // as hash is a bytes array
                PasswordSalt = hmac.Key
            };

            // add user to the database
            context.Users!.Add(user);
            await context.SaveChangesAsync();

            return user;

        }
    }
}
