using System.Linq;

namespace workout_app.DAL.Repositories
{
    public interface IWorkoutSessionRepository : IRepository<DAL.Models.WorkoutSession>
    {
        new IQueryable<DAL.Models.WorkoutSession> GetQueryable();
    }
}