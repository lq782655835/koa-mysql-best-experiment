const Sequelize = require('sequelize')

const {
  dbName,
  host,
  port,
  user,
  password
} = require('../config/config').database

const sequelize = new Sequelize(dbName, user, password, {
  dialect: 'mysql',
  host,
  port,
  logging: false,
  timezone: '+08:00',
  define: {
    // create_time && update_time
    timestamps: true,
    // delete_time
    paranoid: true, // 软删除
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    // 把驼峰命名转换为下划线
    underscored: true,
    scopes: {
      // 设置scope,某些表查询不需要吐全部字段
      bh: {
        attributes: {
          exclude: ['password', 'updated_at', 'deleted_at', 'created_at']
        }
      },
      iv: {
        attributes: {
          exclude: ['content', 'password', 'updated_at', 'deleted_at']
        }
      }
    }
  }
})
// 创建模型
sequelize.sync({force: false}) // model自动同步database，即自动创建表
module.exports = {
  sequelize
}
