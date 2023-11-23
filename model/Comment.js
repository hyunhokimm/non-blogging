
//시퀄라이즈 댓글 모델
function comment(Sequelize, DataTypes) {
  return Sequelize.define(
    "comment",
    {
      commentId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      commentWrite: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      noteId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "note",
          key: "noteId",
        },
      },
      email: {
        type: DataTypes.STRING(30),
        allowNull: false,
        references: {
          model: "user",
          key: "email",
        },
      },
    },
    {
      tableName: "Comment",
      freezeTableName: true,
      timestamps: true,
    }
  );
}

module.exports = comment;
