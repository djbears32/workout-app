using workout_app.DAL.Repositories;

namespace workout_app.Factories
{
    public interface IRepositoryFactory
    {
    IRepository<TEntity> GetRepository<T, TEntity>() where T : IRepository<TEntity>;
    }
}