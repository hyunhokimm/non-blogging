
//시퀄라이즈 유저 모델
function user(Sequelize, DataTypes) {
  return Sequelize.define(
    "user",
    {
      // 이메일
      email: {
        type: DataTypes.STRING(30),
        allowNull: false,
        primaryKey: true,
      },
      // 비밀번호
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      // 닉네임
      nickname: {
        type: DataTypes.STRING(15),
        allowNull: false,
      },
    },
    {
      tableName: "User",
      freezeTableName: true,
      timestamps: false,
    }
  );
}
module.exports = user;
