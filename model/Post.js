// Sequelize 모델 정의
function postModel(sequelize, DataTypes) {
    const posts = sequelize.define(
        "post", 
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
                type: DataTypes.STRING(100),
                allowNull: false
            },
            // 내용 설정
            content: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            // user 테이블과 연결할 컬럼 설정
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "user",
                    key: "id"
                }
            }
        }, 
        {
            tableName: "post",
            freezeTableName : true, 
            timestamps: false
        }    
    );

    // 모델 간의 관계 설정 
    posts.belongsTo(User, { foreignKey: 'userId' });

    // 모델 반환
    return posts;
}

module.exports = postModel;