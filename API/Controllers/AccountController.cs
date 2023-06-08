using API.DTOs;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<User> _userManager;

        public AccountController(UserManager<User> userManager)
        {
            _userManager = userManager;
        }
        /// <summary>
        /// Authenticates a user by their email and password and returns a UserDto upon successful login.
        /// </summary>
        /// <param name="loginDto">The LoginDto containing the user's email and password.</param>
        /// <returns>An ActionResult containing a UserDto if the login is successful; otherwise, an Unauthorized result.</returns>
        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _userManager.FindByEmailAsync(loginDto.Email);
            
            if (user == null) return Unauthorized();

            var result = await _userManager.CheckPasswordAsync(user, loginDto.Password);

            if (result) return CreateUserObject(user);

            return Unauthorized();
        }
        [HttpGet]
        public async Task<ActionResult<List<UserDto>>> GetUsers()
        {
            return Ok(await _userManager.Users.ToListAsync());
        }

        /// <summary>
        /// Creates a UserDto object based on the provided User entity.
        /// </summary>
        /// <param name="user">The User entity to create the UserDto from.</param>
        /// <returns>The created UserDto object.</returns>
        private UserDto CreateUserObject(User user) => new()
        {
            Username = user.UserName,
            IsAdmin = user.IsAdmin
        };
    }
}
