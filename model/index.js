function User(Sequelize, DataTypes) {
  return Sequelize.define(
    "user",
    {
      email: {
        type: Datatypes.STRING(25),
        allowNull: False,
      },
      password: varchar,
    },
    {
      tableName: "user",
      freezeTableName: true,
      timestamps: false,
    }
  );
}

module.exports = Customer;
