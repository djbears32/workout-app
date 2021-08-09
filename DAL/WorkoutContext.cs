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

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                //warning
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TrainingPlan>().ToTable("TrainingPlan");

            modelBuilder.Entity<WorkoutType>().ToTable("WorkoutType");

            modelBuilder.Entity<Workout>().ToTable("Workout");
            modelBuilder.Entity<Workout>().HasKey(w => w.WeekId);
            

            modelBuilder.Entity<Exercise>().ToTable("Exercise");

            modelBuilder.Entity<MuscleGroup>().ToTable("MuscleGroup");
        }

        /*protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TrainingPlan>(entity =>
            {
                entity.HasKey(t => t.TrainingId);

                entity.ToTable("TrainingPlan");

                entity.Property(t => t.TrainingId).HasColumnName("Training_ID");
                
                entity.Property(t => t.TrainingPlanName)
                    .HasColumnName("Training_Plan_Name")
                    .HasMaxLength(25);

                entity.Property(t => t.StartDate)
                    .HasColumnName("Start_Date")
                    .HasColumnType("datetime");

                entity.Property(t => t.WorkoutLength).HasColumnName("Workout_Length");

                entity.Property(t => t.EndDate)
                    .HasColumnName("End_Date")
                    .HasColumnType("datetime");

                entity.Property(t => t.WorkoutsPerWeek).HasColumnName("Workouts_Per_Week");

                entity.Property(t => t.WorkoutTypeName).HasColumnName("Workout_Type_Name");

                entity.HasMany(t => t.WorkoutType)
                    .WithOne(w => w.TrainingPlan)
                    .HasForeignKey(d => d.WorkoutTypeName);
            });
        }*/
    }
}