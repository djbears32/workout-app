using System.Linq;
using workout_app.DAL.Models;

namespace workout_app.DAL.Repositories
{
    public class MuscleGroupRepository : BaseRepository<DAL.Models.MuscleGroup>, IMuscleGroupRepository
    {
        public MuscleGroupRepository(DAL.UnitOfWork.IUnitOfWork unitOfWork) : base(unitOfWork) { }
        IQueryable<MuscleGroup> IMuscleGroupRepository.GetQueryable()
        {
            return (IQueryable<MuscleGroup>)base.GetQueryable();
        }
    }
}