using System.Linq;

namespace workout_app.DAL.Repositories
{
    public interface IWorkoutRepository : IRepository<DAL.Models.Workout>
    {
        new IQueryable<DAL.Models.Workout> GetQueryable();
    }
}