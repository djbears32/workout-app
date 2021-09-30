using System.Linq;
using workout_app.DAL.Models;

namespace workout_app.DAL.Repositories
{
    public class WorkoutRepository : BaseRepository<DAL.Models.Workout>, IWorkoutRepository
    {
        public WorkoutRepository(DAL.UnitOfWork.IUnitOfWork unitOfWork) : base(unitOfWork) { }
        IQueryable<Workout> IWorkoutRepository.GetQueryable()
        {
            return (IQueryable<Workout>)base.GetQueryable();
        }
    }
}