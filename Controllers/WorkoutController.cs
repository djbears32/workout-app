using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using workout_app.DAL.Models;
using workout_app.ViewModels;

namespace workout_app.Controllers
{
    [ApiController]
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
        public ActionResult GetExercises()
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

        [HttpGet("getmusclegroups")]
        public ActionResult getMuscleGroups()
        {
            try
            {
               return Ok(this.exerciseAPI.getMuscleGroups());
            }
            catch
            {
                return StatusCode((int)System.Net.HttpStatusCode.InternalServerError, "Call to get muscle groups failed");
            }
        }

        [HttpGet("gettrainingplans")]
        public ActionResult getTrainingPlans()
        {
            try
            {
               return Ok(this.exerciseAPI.getTrainingPlans());
            }
            catch
            {
                return StatusCode((int)System.Net.HttpStatusCode.InternalServerError, "Call to get training plans failed");
            }
        }

        [HttpGet("getworkouttypes")]
        public ActionResult getWorkoutTypes()
        {
            try
            {
               return Ok(this.exerciseAPI.getWorkoutTypes());
            }
            catch
            {
                return StatusCode((int)System.Net.HttpStatusCode.InternalServerError, "Call to get training plans failed");
            }
        }

        [HttpPost("addexercises")]
        public ActionResult AddExercises(ExerciseViewModel vm)
        {
            try
            {
                this.exerciseAPI.addExercises(vm);
               return Ok();
            }
            catch
            {
                return StatusCode((int)System.Net.HttpStatusCode.InternalServerError, "Adding exercise failed");
            }
        }

        [HttpPost("addmusclegroups")]
        public ActionResult AddMuscleGroups(MuscleGroupViewModel vm)
        {
            try
            {
                this.exerciseAPI.addMuscleGroups(vm);
               return Ok();
            }
            catch
            {
                return StatusCode((int)System.Net.HttpStatusCode.InternalServerError, "Adding muscle Group failed");
            }
        }

        [HttpPost("addtrainingplans")]
        public ActionResult AddTrainingPlans(TrainingPlanViewModel vm)
        {
            try
            {
                this.exerciseAPI.AddTrainingPlans(vm);
               return Ok();
            }
            catch
            {
                return StatusCode((int)System.Net.HttpStatusCode.InternalServerError, "Adding training plans failed");
            }
        }

        [HttpPost("addworkouttypes")]
        public ActionResult AddWorkoutTypes(WorkoutTypeViewModel vm)
        {
            try
            {
                this.exerciseAPI.AddWorkoutTypes(vm);
               return Ok();
            }
            catch
            {
                return StatusCode((int)System.Net.HttpStatusCode.InternalServerError, "Adding workout types failed");
            }
        }

        [HttpPost("addworkouts")]
        public ActionResult AddWorkouts(WorkoutViewModel vm)
        {
            try
            {
                this.exerciseAPI.AddWorkouts(vm);
               return Ok();
            }
            catch
            {
                return StatusCode((int)System.Net.HttpStatusCode.InternalServerError, "Adding workouts failed");
            }
        }
    }
}