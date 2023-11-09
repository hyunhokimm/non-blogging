function register(Sequelize, DataTypes){
  return Sequelize.define(
    "user", 
    { 
      // id 기본키로 설정
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      }, 
      // 이메일 설정
      email: {
          type: DataTypes.STRING(50),
          allowNull: false
      },
      // 닉네임 설정
      nickname: {
          type: DataTypes.STRING(30),
          allowNull: false
      },
      // 비밀번호 설정 (솔트 미적용)
      password: {
          type: DataTypes.STRING(100),
          allowNull: false
      }
    }, 
    { 
      tableName: "user",
      freezeTableName : true, 
      timestamps: false
    } 
  );
}

module.exports=register;