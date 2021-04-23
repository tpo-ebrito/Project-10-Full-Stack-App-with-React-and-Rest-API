const { Model, DataTypes } = require('sequelize')
const bcrypt = require('bcryptjs')

module.exports = (sequelize) => {
  class Users extends Model {}

  Users.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'A first name is required'
        },
        notEmpty: {
          msg: 'Please provide a first name'
        }
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'A last name is required'
        },
        notEmpty: {
          msg: 'Please provide a last name'
        }
      }
    },
    emailAddress: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'That email address already exists'
      },
      validate: {
        notNull: {
          msg: 'An email address is required'
        },
        isEmail: {
          msg: 'Please provide a valid email address'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Both passwords must match'
        },
        notEmpty: {
          msg: 'Please provide a password'
        }
      },
      set (val) {
        if (val) {
          const hashedPassword = bcrypt.hashSync(val)
          this.setDataValue('password', hashedPassword)
        } else if (val === '') {
          this.setDataValue('password', '')
        }
      }
    }
  }, { sequelize })

  Users.associate = (models) => {
    Users.hasMany(models.Courses, {
      foreignKey: {
        name: 'userId',
        allowNull: false
      }
    })
  }

  return Users
}