// User 모델 가져오기
const user = require("./User");

function contents(Sequelize, DataTypes) {
    const content = Sequelize.define(
        "Content", 
        { 
            // id 기본키로 설정
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            }, 
            // 제목 설정
            title: {
                type: DataTypes.STRING(50),
                allowNull: false
            },
            // 내용 설정
            content: {
                type: DataTypes.TEXT('medium'),
            },
        }, 
        { 
            tableName: "content",
            freezeTableName: true, 
            timestamps: false
        } 
    );
    // 외래키 연결
    content.belongsTo(user);
    return content;
}
module.exports = contents;