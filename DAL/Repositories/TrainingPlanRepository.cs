using System.Linq;
using workout_app.DAL.Models;

namespace workout_app.DAL.Repositories
{
    public class TrainingPlanRepository : BaseRepository<DAL.Models.TrainingPlan>, ITrainingPlanRepository
    {
        public TrainingPlanRepository(DAL.UnitOfWork.IUnitOfWork unitOfWork) : base(unitOfWork) { }
        IQueryable<TrainingPlan> ITrainingPlanRepository.GetQueryable()
        {
            return (IQueryable<TrainingPlan>)base.GetQueryable();
        }
    }
}