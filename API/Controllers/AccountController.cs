using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AccountController(DataContext context) : BaseApiController
    {
        [HttpPost("register")] // api/account/register
        public async Task<ActionResult<AppUser>> Register(RegisterDto registerDto) // we want to receive the params as objects
        {

            if (await UserExists(registerDto.Username)) return BadRequest("Username is taken"); // have to await as it's an async method

            using var hmac = new HMACSHA512(); // using means it will dispose of the object after it's done
            
            // create a new user
            var user = new AppUser
            {
                Username = registerDto.Username.ToLower(), // here we store all usernames in lowercase
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)), // as hash is a bytes array
                PasswordSalt = hmac.Key
            };

            // add user to the database
            context.Users!.Add(user);
            await context.SaveChangesAsync();

            return user;

        }

        [HttpPost("login")]
        public async Task<ActionResult<AppUser>> Login(LoginDto loginDto)
        {
            // get user from the database
            var user = await context.Users!.FirstOrDefaultAsync(x => x.Username == loginDto.Username.ToLower());
            
            // if user doesn't exist
            if (user == null) return Unauthorized("Username doesn't exist");
            
            // get password and compare it with the one in the database
            using var hmac = new HMACSHA512(user.PasswordSalt);

            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));

            for (int i = 0; i < computedHash.Length; i++)
            {
                if (computedHash[i] != user.PasswordHash[i]) return Unauthorized("Invalid password");
            }

            return user;
        }

        private async Task<bool> UserExists(string username)
        {
            if (context.Users == null) return false;
            return await context.Users.AnyAsync(x => x.Username.ToLower() == username.ToLower()); // don't use .Equals as entity framework doesn't support it
        }
    }
}
