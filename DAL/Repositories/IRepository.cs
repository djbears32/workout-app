using System.Linq;

namespace workout_app.DAL.Repositories
{
    public interface IRepository<TEntity>
    {
        IQueryable GetQueryable();

        void Add(TEntity entity);
        void Update(TEntity entity);
        void Delete(TEntity entity);

    }
}