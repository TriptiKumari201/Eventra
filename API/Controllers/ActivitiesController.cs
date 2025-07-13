using System.Diagnostics;
using Domain;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActivitiesController(AppDbContext context) : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<List<EventActivity>>> GetActivities()
        {
            return await context.Activities.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<EventActivity>> GetActivityById(string id)
        {
            var activity = await context.Activities.FirstOrDefaultAsync(u => u.Id == id);
            if (activity == null) return NotFound();
            return activity;
        }
    }
}
