const userModel = require('../models/user')
const pagination = require('../utils/pagination')

class UserDao {
  // 根据手机号(账户)查询个人信息
  async findUserByAccount(account) {
    return await userModel.findOne({ account })
  }

  // 创建账户
  async createUser(userInfo) {
    return await userModel.create({
      ...userInfo,
      activation_status: 1,
    })
  }

  // 激活账户
  async updateActivationStatus(account, status) {
    return await userModel.updateOne(
      { account },
      {
        activation_status: status,
      }
    )
  }

  // 软删账户
  async updateDeleteStatus(account) {
    return await userModel.updateOne(
      { account },
      {
        delete_status: 1,
      }
    )
  }

  // 更新账户信息
  async updateUser({ account, user_name, password, new_account, role_id }) {
    return await userModel.updateOne(
      { account },
      {
        user_name,
        password,
        role_id,
        account: new_account,
      }
    )
  }

  // 根据用户id查找个人信息
  async findUserById(user_id) {
    return await userModel.findById(user_id)
  }

  //联表查询用户对应角色信息
  async findUserRoleInfo(account) {
    return await userModel.findOne({ account }).populate("role_id")
  }

  // 查询用户列表(分页)
  async findUserList({ account, department, activation_status, size, page }) {
    return await pagination(
      userModel.find({
        account,
        department,
        activation_status,
      }),
      { size, page }
    )
  }
}

const userDao = new UserDao()

module.exports = userDao
