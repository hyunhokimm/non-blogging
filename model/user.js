function User(Sequelize, DataTypes) {
  return Sequelize.define(
    "User",
    {
      // id > auto로 설정
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      // 이메일
      email: {
        type: DataTypes.STRING(50),
        allowNull: true,
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
      checkPassword: {
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

module.exports = User;
