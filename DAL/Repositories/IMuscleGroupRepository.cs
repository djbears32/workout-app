using System.Linq;

namespace workout_app.DAL.Repositories
{
public interface IMuscleGroupRepository : IRepository<DAL.Models.MuscleGroup>
    {
        new IQueryable<DAL.Models.MuscleGroup> GetQueryable();
    }
}