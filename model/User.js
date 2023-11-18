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
      // 비밀번호 (솔트 미적용)
      password: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      // checkPassword 부분은 필요 없을 듯 합니다.
      // 프론트 에서 2개의 비밀 번호 검증 후 password만 보내주거든요
    },
    {
      tableName: "User",
      freezeTableName: true,
      timestamps: false,
    }
  );
}
module.exports = user;
