function user(Sequelize, DataTypes) {
  return Sequelize.define(
    "user",
    {
      // 이메일
      email: {
        type: DataTypes.STRING(50),
        allowNull: true,
        primaryKey: true,
      },
      // 닉네임
      nickname: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      // 비밀번호
      password: {
        type: DataTypes.STRING(100),
        allowNull: true,
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
