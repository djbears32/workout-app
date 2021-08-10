using System.Linq;
using workout_app.DAL.Models;

namespace workout_app.DAL.Repositories
{
    public class ExcerciseRepository : BaseRepository<DAL.Models.Exercise>, IExerciseRepository
    {
        public ExcerciseRepository(DAL.UnitOfWork.IUnitOfWork unitOfWork) : base(unitOfWork) { }
        IQueryable<Exercise> IExerciseRepository.GetQueryable()
        {
            return (IQueryable<Exercise>)base.GetQueryable();
        }
    }
}