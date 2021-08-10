using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace workout_app.DAL.UnitOfWork
{
    public interface IUnitOfWork
    {
        DbSet<TEntity> GetDBSet<TEntity>() where TEntity : class;
        void Commit();
        bool HasChanges();
        //IEnumberable<Microsoft.EntityFrameworkCore.ChangeTracking.EntityEntry> GetChangedEntries<TEntity>() where TEntity : class;
    }
}