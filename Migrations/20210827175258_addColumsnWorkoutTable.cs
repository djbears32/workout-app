using Microsoft.EntityFrameworkCore.Migrations;

namespace workout_app.Migrations
{
    public partial class addColumsnWorkoutTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "DayId",
                table: "Workout",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "Workout",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DayId",
                table: "Workout");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "Workout");
        }
    }
}
