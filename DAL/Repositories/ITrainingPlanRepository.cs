using System.Linq;

namespace workout_app.DAL.Repositories
{
    public interface ITrainingPlanRepository : IRepository<DAL.Models.TrainingPlan>
    {
        new IQueryable<DAL.Models.TrainingPlan> GetQueryable();
    }
}