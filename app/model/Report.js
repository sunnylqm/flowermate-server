module.exports = app => {
  const DataTypes = app.Sequelize;
  const Report = app.model.define(
    'Report',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      image: DataTypes.INTEGER,
      extra: DataTypes.JSON,
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'User',
          key: 'id',
        },
      },
      type: DataTypes.ENUM('plant', 'animal'),
      lon: DataTypes.DOUBLE,
      lat: DataTypes.DOUBLE,
    },
    {
      freezeTableName: true,
    },
  );
  Report.associate = () => {
    app.model.Report.belongsTo(app.model.User, { as: 'user' });
  };
  return Report;
};
