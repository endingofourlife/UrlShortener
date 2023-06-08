using Domain;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.NetworkInformation;
using System.Text;
using System.Threading.Tasks;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<User> userManager)
        {
            if(!userManager.Users.Any())
            {
                var users = new List<User>
                {
                    new User {UserName="Bob", Email="bob@test.com", IsAdmin=true},
                    new User {UserName="Alice", Email="alice@test.com", IsAdmin=false}
                };
                foreach(var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }
            }
            await context.SaveChangesAsync();
        }
    }
}
