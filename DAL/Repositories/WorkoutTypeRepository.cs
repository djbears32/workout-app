using System.Linq;
using workout_app.DAL.Models;

namespace workout_app.DAL.Repositories
{
    public class WorkoutTypeRepository : BaseRepository<DAL.Models.WorkoutType>, IWorkoutTypeRepository
    {
        public WorkoutTypeRepository(DAL.UnitOfWork.IUnitOfWork unitOfWork) : base(unitOfWork) { }
        IQueryable<WorkoutType> IWorkoutTypeRepository.GetQueryable()
        {
            return (IQueryable<WorkoutType>)base.GetQueryable();
        }
    }
}