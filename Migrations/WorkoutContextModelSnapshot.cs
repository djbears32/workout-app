﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using workout_app.DAL.Models;

namespace workout_app.Migrations
{
    [DbContext(typeof(WorkoutContext))]
    partial class WorkoutContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.8")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("ExerciseWorkout", b =>
                {
                    b.Property<long>("ExercisesExerciseId")
                        .HasColumnType("bigint");

                    b.Property<int>("WorkoutsWorkoutId")
                        .HasColumnType("int");

                    b.HasKey("ExercisesExerciseId", "WorkoutsWorkoutId");

                    b.HasIndex("WorkoutsWorkoutId");

                    b.ToTable("ExerciseWorkout");
                });

            modelBuilder.Entity("workout_app.DAL.Models.Exercise", b =>
                {
                    b.Property<long>("ExerciseId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("ExerciseName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<long>("MuscleGroupId")
                        .HasColumnType("bigint");

                    b.HasKey("ExerciseId");

                    b.HasIndex("MuscleGroupId");

                    b.ToTable("Exercises");
                });

            modelBuilder.Entity("workout_app.DAL.Models.ExerciseWorkout", b =>
                {
                    b.Property<long>("EWInfoId")
                        .HasColumnType("bigint");

                    b.Property<long>("ExerciseId")
                        .HasColumnType("bigint");

                    b.Property<int>("WorkoutId")
                        .HasColumnType("int");

                    b.Property<string>("Reps")
                        .HasColumnType("nvarchar(max)");

                    b.Property<long>("Weight")
                        .HasColumnType("bigint");

                    b.HasKey("EWInfoId", "ExerciseId", "WorkoutId");

                    b.HasIndex("ExerciseId");

                    b.HasIndex("WorkoutId");

                    b.ToTable("ExerciseWorkouts");
                });

            modelBuilder.Entity("workout_app.DAL.Models.MuscleGroup", b =>
                {
                    b.Property<long>("MuscleGroupId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("MuscleGroupName")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("MuscleGroupId");

                    b.ToTable("MuscleGroups");
                });

            modelBuilder.Entity("workout_app.DAL.Models.TrainingPlan", b =>
                {
                    b.Property<long>("TrainingPlanId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("EndDate")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("StartDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("TrainingPlanName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("WorkoutLength")
                        .HasColumnType("int");

                    b.Property<long>("WorkoutTypeId")
                        .HasColumnType("bigint");

                    b.Property<int>("WorkoutsPerWeek")
                        .HasColumnType("int");

                    b.HasKey("TrainingPlanId");

                    b.HasIndex("WorkoutTypeId");

                    b.ToTable("TrainingPlans");
                });

            modelBuilder.Entity("workout_app.DAL.Models.Workout", b =>
                {
                    b.Property<int>("WorkoutId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime2");

                    b.Property<long>("TrainingPlanId")
                        .HasColumnType("bigint");

                    b.HasKey("WorkoutId");

                    b.HasIndex("TrainingPlanId");

                    b.ToTable("Workouts");
                });

            modelBuilder.Entity("workout_app.DAL.Models.WorkoutType", b =>
                {
                    b.Property<long>("WorkoutTypeId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("WorkoutTypeName")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("WorkoutTypeId");

                    b.ToTable("WorkoutTypes");
                });

            modelBuilder.Entity("ExerciseWorkout", b =>
                {
                    b.HasOne("workout_app.DAL.Models.Exercise", null)
                        .WithMany()
                        .HasForeignKey("ExercisesExerciseId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("workout_app.DAL.Models.Workout", null)
                        .WithMany()
                        .HasForeignKey("WorkoutsWorkoutId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("workout_app.DAL.Models.Exercise", b =>
                {
                    b.HasOne("workout_app.DAL.Models.MuscleGroup", "MuscleGroups")
                        .WithMany("Exercises")
                        .HasForeignKey("MuscleGroupId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("MuscleGroups");
                });

            modelBuilder.Entity("workout_app.DAL.Models.ExerciseWorkout", b =>
                {
                    b.HasOne("workout_app.DAL.Models.Exercise", "Exercises")
                        .WithMany()
                        .HasForeignKey("ExerciseId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("workout_app.DAL.Models.Workout", "Workouts")
                        .WithMany()
                        .HasForeignKey("WorkoutId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Exercises");

                    b.Navigation("Workouts");
                });

            modelBuilder.Entity("workout_app.DAL.Models.TrainingPlan", b =>
                {
                    b.HasOne("workout_app.DAL.Models.WorkoutType", "WorkoutType")
                        .WithMany("TrainingPlan")
                        .HasForeignKey("WorkoutTypeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("WorkoutType");
                });

            modelBuilder.Entity("workout_app.DAL.Models.Workout", b =>
                {
                    b.HasOne("workout_app.DAL.Models.TrainingPlan", "TrainingPlan")
                        .WithMany("Workout")
                        .HasForeignKey("TrainingPlanId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("TrainingPlan");
                });

            modelBuilder.Entity("workout_app.DAL.Models.MuscleGroup", b =>
                {
                    b.Navigation("Exercises");
                });

            modelBuilder.Entity("workout_app.DAL.Models.TrainingPlan", b =>
                {
                    b.Navigation("Workout");
                });

            modelBuilder.Entity("workout_app.DAL.Models.WorkoutType", b =>
                {
                    b.Navigation("TrainingPlan");
                });
#pragma warning restore 612, 618
        }
    }
}