using Microsoft.EntityFrameworkCore;

namespace workout_app.DAL.Models
{
    public partial class WorkoutContext : DbContext
    {
        public WorkoutContext()
        {

        }
        public WorkoutContext(DbContextOptions<WorkoutContext> options)
            : base(options)
        {

        }

        public virtual DbSet<TrainingPlan> TrainingPlans { get; set; }
        public virtual DbSet<WorkoutType> WorkoutTypes { get; set; }
        public virtual DbSet<Workout> Workouts { get; set; }
        public virtual DbSet<Exercise> Exercises { get; set; }
        public virtual DbSet<MuscleGroup> MuscleGroups { get; set; }
        public virtual DbSet<ExerciseWorkout> ExerciseWorkouts { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                //warning
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //modelBuilder.Entity<ExerciseWorkout>.HasKey(x => x.EWInfoId);
            //base.OnModelCreating(modelBuilder);
        }
    }
}