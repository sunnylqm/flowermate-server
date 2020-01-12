module.exports = app => {
  const { STRING, INTEGER, ENUM, JSONB } = app.Sequelize;

  return app.model.define(
    "User",
    {
      id: {
        type: INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      email: {
        type: STRING,
        unique: true
      },
      avatar: INTEGER,
      username: STRING,
      pwd: {
        type: STRING,
        allowNull: false
      },
      token: {
        type: STRING(255),
        allowNull: true,
        defaultValue: ""
      }
    },
    {
      freezeTableName: true
    }
  );
};
