using System.Linq;

namespace workout_app.DAL.Repositories
{
public interface IWorkoutTypeRepository : IRepository<DAL.Models.WorkoutType>
    {
        new IQueryable<DAL.Models.WorkoutType> GetQueryable();
    }
}