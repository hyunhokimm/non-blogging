function Notebook(sequelize, DataTypes) {
  return sequelize.define(
    "Notebook",
    {
      // id 기본키로 설정
      noteId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      // 제목 설정
      title: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      // 내용 설정
      content: {
        type: DataTypes.TEXT("medium"),
        allowNull: true,
      },
      // 노트 공개 여부 (default: public /  1: public, 0: private)
      isPublic: {
        type: DataTypes.ENUM("1", "0"),
        allowNull: false,
      },
      // user 테이블과 연결할 컬럼 설정
      connectUser: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "User",
          key: "email",
        },
      },
    },
    {
      tableName: "Notebook",
      freezeTableName: true,
      timestamps: false,
    }
  );
}

module.exports = Notebook;
