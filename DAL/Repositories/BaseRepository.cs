using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace workout_app.DAL.Repositories
{
    public abstract class BaseRepository<Tentity> : IRepository<Tentity> where Tentity : class
    {
        protected DAL.UnitOfWork.IUnitOfWork unitOfWork;
        protected DbSet<Tentity> DbSet;
        public BaseRepository(DAL.UnitOfWork.IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
            this.DbSet = unitOfWork.GetDBSet<Tentity>();
        }

        public IQueryable GetQueryable()
        {
            return this.DbSet.AsQueryable<Tentity>();
        }

        public void Add(Tentity entity)
        {
            this.DbSet.Add(entity);
        }

        public void Update(Tentity entity)
        {
            this.DbSet.Update(entity);
        }

        public void Delete(Tentity entity)
        {
            this.DbSet.Remove(entity);
        }
    }
}