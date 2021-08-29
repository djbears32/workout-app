using System.Linq;
using workout_app.DAL.Models;

namespace workout_app.DAL.Repositories
{
    public class WorkoutSessionRepository : BaseRepository<DAL.Models.WorkoutSession>, IWorkoutSessionRepository
    {
        public WorkoutSessionRepository(DAL.UnitOfWork.IUnitOfWork unitOfWork) : base(unitOfWork) { }
        IQueryable<WorkoutSession> IWorkoutSessionRepository.GetQueryable()
        {
            return (IQueryable<WorkoutSession>)base.GetQueryable();
        }
    }
}