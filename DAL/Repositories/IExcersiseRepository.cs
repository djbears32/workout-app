using System.Linq;

namespace workout_app.Repositories
{
    public interface IExerciseRepository : IRepository<DAL.Models.Exercise>
    {
        new IQueryable<DAL.Models.Exercise> GetQueryable();
    }
}