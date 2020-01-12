module.exports = app => {
  const DataTypes = app.Sequelize;
  const FeedLike = app.model.define(
    'FeedLike',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'User',
          key: 'id',
        },
      },
      feedId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Feed',
          key: 'id',
        },
      },
    },
    {
      freezeTableName: true,
      indexes: [
        {
          unique: true,
          fields: ['userId', 'feedId'],
        },
      ],
    },
  );
  // FeedLike.associate = () => {
  //   app.model.FeedLike.belongsTo(app.model.User, { as: 'user' });
  //   // app.model.FeedLike.belongsTo(app.model.Feed, { constraints: false, as: 'feed' });
  // };
  return FeedLike;
};
