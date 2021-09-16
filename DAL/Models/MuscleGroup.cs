using System.Collections.Generic;

namespace workout_app.DAL.Models
{
    public class MuscleGroup
    {
        public int MuscleGroupId { get; set; }
        public string MuscleGroupName { get; set; }  

         public virtual ICollection<Exercise> Exercise { get; private set;}  
    }
}