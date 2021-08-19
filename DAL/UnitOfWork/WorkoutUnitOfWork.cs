using workout_app.DAL.UnitOfWork;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using System.Collections.Generic;
using System.Linq;

namespace workout_app.DAL.UnitOfWork
{
    public class WorkoutUnitOfWork : IUnitOfWork
    {
        DAL.Models.WorkoutContext dbContext;

        public WorkoutUnitOfWork(DAL.Models.WorkoutContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public DbSet<TEntity> GetDBSet<TEntity>() where TEntity : class
        {
            return this.dbContext.Set<TEntity>();
        }

        public void Commit()
        {
            this.dbContext.SaveChanges();
        }

        public bool HasChanges()
        {
            return this.dbContext.ChangeTracker.HasChanges();
        }

        public IEnumerable<EntityEntry> GetChangedEntries<TEntity>() where TEntity : class
        {
            return this.dbContext.ChangeTracker
                .Entries<TEntity>()
                .Where(entry => entry.State == EntityState.Modified ||
                entry.State == EntityState.Added ||
                entry.State == EntityState.Deleted ||
                entry.State == EntityState.Detached);
        }
    }
}