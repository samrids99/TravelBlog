using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/[controller]")] // api/users
    [ApiController]
    public class UsersController(DataContext context) : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers() // action result means we can return http style responses
        {
            if (context.Users == null) return NotFound("Users not found");
            var users = await context.Users.ToListAsync();

            return users;
        }

        [HttpGet("{id}")] // api/users/1
        public async Task<ActionResult<AppUser>> GetUser(int id) // grabs argument from the dynamic route
        {
            if (context.Users == null) return NotFound("User not found");
            
            var user = await context.Users.FindAsync(id);

            if (user == null) return NotFound("User not found");

            return user;     
        }
    }
}
