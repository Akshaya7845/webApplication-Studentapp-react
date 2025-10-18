/*using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApp_New1.Models;

namespace WebApp_New1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize] // Require JWT for all actions in this controller
    public class UsersController : ControllerBase
    {
        private readonly StudentAppContext _context;

        public UsersController(StudentAppContext context)
        {
            _context = context;
        }

        // GET: api/Users
        // Accessible by any authenticated user (Student or Teacher)
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
                return NotFound();

            return user;
        }

        // POST: api/Users
        // Only Teachers can create users
        [Authorize(Roles = "Teacher")]
        [HttpPost]
        public async Task<ActionResult<User>> PostUser(User user)
        {
            if (user == null)
                return BadRequest("User data is missing.");

            // Hash password if not already hashed
            if (!string.IsNullOrWhiteSpace(user.PasswordHash))
            {
                user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(user.PasswordHash);
            }

            user.CreatedAt = DateTime.UtcNow;
            user.Lastlogin = DateTime.UtcNow;

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetUser), new { id = user.Id }, user);
        }

        // PUT: api/Users/5
        // Only Teachers can edit users
        [Authorize(Roles = "Teacher")]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, User user)
        {
            if (id != user.Id)
                return BadRequest("ID mismatch");

            var existingUser = await _context.Users.FindAsync(id);
            if (existingUser == null)
                return NotFound("User not found");

            // Update fields
            existingUser.FirstName = user.FirstName;
            existingUser.LastName = user.LastName;
            existingUser.Designation = user.Designation;
            existingUser.Role = user.Role;
            existingUser.Email = user.Email;
            existingUser.Dob = user.Dob;

            if (!string.IsNullOrWhiteSpace(user.PasswordHash))
                existingUser.PasswordHash = BCrypt.Net.BCrypt.HashPassword(user.PasswordHash);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Users.Any(e => e.Id == id))
                    return NotFound();
                else
                    throw;
            }

            return NoContent();
        }

        // DELETE: api/Users/5
        // Only Teachers can delete users
        [Authorize(Roles = "Teacher")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
                return NotFound();

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
*/
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApp_New1.Models;

namespace WebApp_New1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize] // Require valid JWT for all endpoints
    public class UsersController : ControllerBase
    {
        private readonly StudentAppContext _context;

        public UsersController(StudentAppContext context)
        {
            _context = context;
        }

        // ✅ GET: api/Users (Accessible by both Teacher & Student)
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            var users = await _context.Users.ToListAsync();
            return Ok(users);
        }

        // ✅ GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
                return NotFound(new { message = "User not found." });

            return Ok(user);
        }

        // ✅ POST: api/Users (Teacher Only)
        [Authorize(Roles = "Teacher")]
        [HttpPost]
        public async Task<ActionResult<User>> PostUser(User user)
        {
            if (user == null)
                return BadRequest("Invalid user data.");

            // Hash password if not already hashed
            if (!string.IsNullOrWhiteSpace(user.PasswordHash))
                user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(user.PasswordHash);

            user.CreatedAt = DateTime.UtcNow;
            user.Lastlogin = DateTime.UtcNow;

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetUser), new { id = user.Id }, user);
        }

        // ✅ PUT: api/Users/5 (Teacher Only)
        [Authorize(Roles = "Teacher")]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, User user)
        {
            if (id != user.Id)
                return BadRequest("ID mismatch");

            var existingUser = await _context.Users.FindAsync(id);
            if (existingUser == null)
                return NotFound("User not found");

            existingUser.FirstName = user.FirstName;
            existingUser.LastName = user.LastName;
            existingUser.Designation = user.Designation;
            existingUser.Role = user.Role;
            existingUser.Email = user.Email;
            existingUser.Dob = user.Dob;

            if (!string.IsNullOrWhiteSpace(user.PasswordHash))
                existingUser.PasswordHash = BCrypt.Net.BCrypt.HashPassword(user.PasswordHash);

            await _context.SaveChangesAsync();
            return NoContent();
        }

        // ✅ DELETE: api/Users/5 (Teacher Only)
        [Authorize(Roles = "Teacher")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
                return NotFound("User not found");

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
