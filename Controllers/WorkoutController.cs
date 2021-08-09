using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using workout_app.DAL.Models;
using workout_app.ViewModels;

namespace workout_app.Controllers
{
    [Route("api/[controller]")]
    public class WorkoutController : Controller
    {
        API.IExerciseAPI exerciseAPI;

        public WorkoutController(
            API.IExerciseAPI exerciseAPI
        )
        {
            this.exerciseAPI = exerciseAPI;
        }

        [HttpGet("getexercises")]
        public IActionResult GetExercises()
        {
            try
            {
               return Ok(this.exerciseAPI.GetExercises());
            }
            catch
            {
                return StatusCode((int)System.Net.HttpStatusCode.InternalServerError, "Call to get exercises failed");
            }
        }
    }
}