module.exports = app => {
  const DataTypes = app.Sequelize;
  const Feed = app.model.define(
    'Feed',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      images: DataTypes.JSON,
      desc: DataTypes.TEXT,
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'User',
          key: 'id',
        },
      },
    },
    {
      freezeTableName: true,
    },
  );
  Feed.associate = () => {
    app.model.Feed.belongsTo(app.model.User, { as: 'user' });
    app.model.Feed.hasMany(app.model.FeedLike, {
      foreignKey: 'feedId',
      as: 'feedLikes',
    });
  };
  return Feed;
};
